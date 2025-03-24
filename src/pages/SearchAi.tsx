/** currently this is not used in project! */

import React, { useState } from 'react'

const SearchAi = () => {
  const [inputData, setinputData] = useState("")
  const handleSubmit = ()=>{
    if (!inputData.trim()) {
      return false;
    }
    console.log(inputData);
    window.open(`https://chat.openai.com/?model=auto&q=${encodeURIComponent(inputData.trim())}`,"_blank")
  }
  return (
    <div className='px-4 py-18'>
      <h1 className='text-xl font-bold mb-3'>Search</h1>

      <div>
        <form onSubmit={(e) => { e.preventDefault();handleSubmit() }}>
          <div className="search h-12 border-2 text-primary rounded-2xl ">
            <input value={inputData} onChange={(e)=>{setinputData(e.target.value)}} type="search" placeholder='Enter your Text' className='h-12 px-2 w-full inline-block outline-0' />
          </div>
        </form>
      </div>

    </div>
  )
}

export default SearchAi