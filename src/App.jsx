import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
        //useState
  const [length, setLength ] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const [copy , setCopy]= useState("Copy")

  

        //useRef
  const passRef = useRef(null)

  const onCopy=useCallback(()=>{
    setCopy("Copied")
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password,copy])
  
        //useCallback

  const passGen = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str+= "012345679";
    if(charAllow) str+= "!@#$%^&*-_+|?";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllow, charAllow])
  
        //useEffect

  useEffect(()=>{
   passGen() 
  },[length, charAllow, numberAllow, passGen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password Generator'
          readOnly
          ref={passRef}
          />
          <button onClick={onCopy} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{copy}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                  setNumberAllow((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllow}
                  id="characterInput"
                  onChange={() => {
                      setCharAllow((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        

      </div>
    </>
  )
}

export default App