
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';


interface ButtonProps {
    isLoading?: boolean;
    className?: string;
    children: React.ReactNode;  // Allows any React node (including strings, JSX, etc.) as children.  This ensures that the component is flexible and can be used with any content.  This is a common practice in React.  It's also a good idea to enforce this by using TypeScript.  Here, we're using a generic type for the children prop to enforce this.  In this case, it's React.ReactNode.  You can replace this with any other React type if you want to enforce a specific type of children.  For example, if you only want to accept specific types of children, you could use a union type like React.FC<React.ReactElement<any> | string> or React.FC<typeof SomeComponent>.  However, in this case, we're using React.ReactNode for simplicity.  Note: This is just an example.  You may want to adjust
}
const SubmitButton = ({ isLoading, className, children}: ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {isLoading ? (
        <div className='flex items-center gap-4'>
          <Image 
           src='/assets/icons/loader.svg'
           alt='loader'
           width={24}
           height={24}
           className='animate-spin'
          />
          Loading...
        </div>
      ): children}
    </Button>
  )
}

export default SubmitButton