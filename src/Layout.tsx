import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='lg:max-w-3/4 lg:mx-auto'>{children}</div>
  )
}

export default Layout