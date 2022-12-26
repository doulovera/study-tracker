import React from 'react'
import Loader from './loader'

type Props = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
  outlined?: boolean;
}

/*
  add disable prop
*/

export function Button (
  { type = 'button', children, isLoading, onClick, outlined }: Props
) {
  return (
    <div>
      <button
        type={type}
        className={`h-14 w-full px-3 py-2 font-bold ${outlined ? 'text-green-300 bg-slate-800 border-green-400 border-2 hover:text-green-200' : 'text-slate-800 hover:text-slate-900 bg-green-500'} hover:bg-green-600 ring-green-600 rounded-xl focus:ring-4 focus:outline-none transition-colors`}
        onClick={onClick}
      >
        {
          isLoading
            ? <Loader className='w-full h-auto' iconSize={26} />
            : children
        }
      </button>
    </div>
  )
}
