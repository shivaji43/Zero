import {
  MessageSquare,
  FileText,
  Edit
} from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import type { SelectorItem } from './node-selector'
import Image from 'next/image'

export const TextButtons = () => {
  const { editor } = useEditor()
  const { toggleOpen, setPosition } = useAIInline()
  
  if (!editor) return null
  
  // Define AI action handlers
  const handleChatWithAI = () => {
    // Get selected text
    const selection = editor.state.selection
    const selectedText = selection.empty 
      ? '' 
      : editor.state.doc.textBetween(selection.from, selection.to)
    
    console.log("Chat with AI about:", selectedText)
    // Implement chat with AI functionality
  }

  const items = [
    {
      name: 'chat-with-zero',
      label: 'Chat with Zero',
      action: handleChatWithAI,
      useImage: true,
      imageSrc: '/ai.svg'
    },
  ]
  
  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={() => {
            item.action()
          }}
        >
          <Button size='sm' className='rounded-none flex items-center gap-1.5 px-3' variant='ghost'>
            {item.useImage ? (
              <Image src={item.imageSrc} alt={item.label} width={16} height={16} className="h-4 w-4" />
            ) : (
              <item.icon className='h-4 w-4' />
            )}
            <span className='text-xs'>{item.label}</span>
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
