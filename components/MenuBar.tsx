import { Editor } from "@tiptap/react"
import { Button } from "./ui/Button"

interface MenuBarProps {
  editor: Editor | null
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-2 mb-2">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-blue-500 text-white" : ""}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-blue-500 text-white" : ""}
      >
        Italic
      </Button>
    </div>
  )
}
