import React from 'react'

const Button = ({ onClick, className, children }: { onClick: () => void, className: string, children: React.ReactNode }) => {
  return (
    <button onClick={onClick} className={`bg-primary text-dark-bg font-semibold px-8 py-2 rounded-md ${className}`}>{children}</button>
  )
}

export default Button