'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ editable }: { editable: boolean }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: 'Your Post Body',
    editable: editable,
  })

  return (
    <main className='p-2 border rounded-lg flex justify-start flex-col items-stretch'>
      <div className="">Hello World</div>
      <EditorContent editor={editor} className='prose w-full' />
    </main>
  )
}

export default Tiptap
