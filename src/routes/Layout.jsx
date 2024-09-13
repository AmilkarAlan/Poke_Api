import React from 'react'

const Layout = () => {
  return (
<div className="w-screen h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
  <header className="col-span-2 bg-gray-200">
    Header
  </header>
  <aside className="bg-blue-200">
    Side menu
  </aside>
  <main className="bg-green-200">
    Main
  </main>
</div>


  )
}

export default Layout