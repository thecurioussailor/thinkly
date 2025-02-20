import { Editor } from "@tiptap/react"
import { Button } from "./ui/Button"
import { BoldIcon, Code, Italic, Strikethrough, Underline } from "lucide-react"
import { BsTextParagraph } from "react-icons/bs";
import { HiListBullet } from "react-icons/hi2";
import { GoListOrdered } from "react-icons/go";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
interface MenuBarProps {
  editor: Editor | null
}

const tools = [
  {
    task: "bold",
    icon: <BoldIcon size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  },
  {
    task: "underline",
    icon: <Underline size={20}/>
  },
  {
    task: "strike",
    icon: <Strikethrough size={20}/>
  },
  {
    task: "code",
    icon: <Italic size={20}/>
  },
  {
    task: "codeblock",
    icon: <Italic size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  },
  {
    task: "italic",
    icon: <Italic size={20}/>
  }
]

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap mb-2">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`border-y border-l bg-white rounded-none shadow-none text-black hover:text-white ${editor.isActive("bold") ? "bg-black text-white" : ""}`}
      >
        <BoldIcon/>
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`border bg-white rounded-none shadow-none text-black hover:text-white ${editor.isActive("italic") ? "bg-black text-white" : ""}`}
      >
        <Italic/>
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`border-y bg-white rounded-none shadow-none text-black hover:text-white ${editor.isActive("strike") ? "bg-black text-white" : ""}`}
      >
        <Strikethrough/>
      </Button>
      <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`border bg-white rounded-none shadow-none text-black hover:text-white ${editor.isActive('code') ? 'bg-black text-white' : ''}`}
        >
          <Code/>
        </Button>
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Toggle code block
          </button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
        >
          Code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`border-y bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          <BsTextParagraph />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`border bg-white rounded-none shadow-none text-black hover:bg-gray-200  ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`border-y bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`border bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`border-y bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
        >
          H4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`border bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
        >
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
        >
          H6
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          <HiListBullet />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={` border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200${editor.isActive('orderedList') ? 'is-active' : ''}`}
        >
          <GoListOrdered />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200 ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        >
          Blockquote
        </Button>
        <Button 
          className="border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button 
          className="border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </Button>
        <Button
          className="border-b border-l bg-white rounded-none shadow-none text-black hover:bg-gray-200"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <FaUndo />
        </Button>
        <Button
          className="border-b border-x bg-white rounded-none shadow-none text-black hover:bg-gray-200"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <FaRedo/>
        </Button>
    </div>
  )
}
