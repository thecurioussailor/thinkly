import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          profile(profile){
            return {
                id: profile.sub,
                name: profile.name || "Anonymous name",
                email: profile.name,
                image: profile.picture || null,
                emailVerified: profile.email_verified
            }
          }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
                });

                if (!user) {
                    throw new Error("No user found with this email");
                }
              
                const isPasswordValid = await bcrypt.compare(password, user.password!);
                if (!isPasswordValid) {
                  throw new Error("Invalid credentials");
                }
                return {
                    id: user.id,
                    name: user.name ?? undefined,
                    email: user.email,
                    image: user.image ?? undefined,
                  };
            }
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture as string | null,
                };
            }
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
              }
              if (account?.provider === "google" && profile) {
                token.picture = profile.picture;
              }
              return token;
          },
        signIn: async ({ user, account}) => {
            if(account?.provider === "google") {
                try {
                    const { email, name, image} = user;
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    })

                    if(existingUser){
                        await prisma.account.upsert({
                            where: {
                              provider_providerAccountId: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                              },
                            },
                            update: {
                              userId: existingUser.id,
                            },
                            create: {
                              userId: existingUser.id,
                              provider: account.provider,
                              providerAccountId: account.providerAccountId,
                              type: account.type,
                              access_token: account.access_token,
                              refresh_token: account.refresh_token,
                              expires_at: account.expires_at,
                            },
                          });
                    } else {
                        
                            // Create a new user if none exists
                            await prisma.user.create({
                              data: {
                                email: email as string,
                                name,
                                image,
                                accounts: {
                                  create: {
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    type: account.type,
                                    access_token: account.access_token,
                                    refresh_token: account.refresh_token,
                                    expires_at: account.expires_at,
                                  },
                                },
                              },
                            });
                    }
                    return true;
                } catch (error) {
                    throw new Error("Error while creating user")
                }
            }
            return false
        }
    },
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    }
};
