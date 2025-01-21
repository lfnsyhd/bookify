import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='bg-black min-h-screen'>
        {children}
      </div>
    </>
  )
}

export default MainLayout