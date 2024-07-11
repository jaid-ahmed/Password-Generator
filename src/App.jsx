import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const[length, setLength]=useState(8)
  const[number, setNumber]=useState(false);
  const[attherate, setAttherate]=useState(false)
  const[password, setPassword]=useState(true)
  
//use Ref

 const passwordRef = useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str +="0123456789"
    if(attherate) str +="!@#$%^&*{}[]~`"
    for (let i = 1; i <=length;  i++){
      let character=Math.floor(Math.random()*str.length + 1)
      pass +=str.charAt(character)
    
    }
    setPassword(pass)
  
    


  },[length,number,attherate,setPassword])

  const copypasswordtoClipboard= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  },
  

  [password])


  useEffect(()=>
  {
    passwordGenerator()
  },[length,number,attherate,passwordGenerator])
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md 
   rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
   
   <h1 className='text-white text-center my-3'>Generate Password</h1>
   <div className='className="flex shadow rounded-lg 
   overflow-hidden mb-4"'>
   <input
   type='text'
   value={password}
   className='outline-none w-full py-1 px-3'
   placeholder='password'
   readOnly
   ref={passwordRef}
   />
   <button
   onClick={copypasswordtoClipboard}
   className='outline-none bg-blue-700 text-white
   px-3 py-0.5 shrink-0'>Copy</button>

   </div>
   <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
      <input 
      type='range'
      min={6}
      max={100}
      value={length}
      className='cursor-poniter'
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label> Length:{length}</label>
    </div>
    <div className="flex items-center gap-x-1">
      <input 
      type='checkbox'
      defaultChecked={number}
      id='numberInput'
      onChange={()=>{setNumber((prev)=>!prev);}}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input 
      type='checkbox'
      defaultChecked={attherate}
      id='charInput'
      onChange={()=>{
        setAttherate((prev)=>!prev);}}

     />
      <label htmlFor="charInput">Characters</label>
    </div>
   </div>
   </div>
   </>
  )
}

export default App
