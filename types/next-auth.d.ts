import NextAuth, { DefaultSession, DefaultJWT, Profile as DefaultProfile } from "next-auth";

declare module "next-auth" {
  interface Profile extends DefaultProfile {
    picture?: string; // Add the picture property
    email_verified?: boolean; // Add this if not already defined
  }

  interface Session extends DefaultSession {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    name?: string;
    email?: string;
    picture?: string | null;
  }
}
