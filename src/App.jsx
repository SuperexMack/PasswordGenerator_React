import { useState , useCallback , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {


//first we are creating states so that we can use them to make change in the UI
const [length , inputLength] = useState(8);
const [numberAllowed , setNumberAllowed] = useState(false);
const [characterAllowed , setcharacterAllowed] = useState(false);
const [password , setPassword] = useState("")


const passwordRef = useRef(null)

const copyCodetoClipboard = useCallback(()=>{
passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
} , [password])


// here the things which are written inside the variable are used to change the UI
// the second part is used as function and the first part is used to call inside the variable

const passwordGenerator  = useCallback(()=>{

let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

if(numberAllowed) str+="123456789"
if(characterAllowed) str+="!@(){}#^%_-+=?";

for(let i = 0 ; i<length ; i++){
  let char = Math.floor(Math.random()*str.length + 1)
  pass += str.charAt(char)
}

setPassword(pass)


} , [length , numberAllowed , characterAllowed , setPassword])

useEffect(()=>{
  passwordGenerator()
} , [length , numberAllowed , characterAllowed , passwordGenerator])



  return (
    <>
      <h1 className='text-red-500 text-4xl bg-slate-800 rounded-lg w-3/5 h-14 p-1 ml-56'>Password Generator</h1>
      <div className='bg-gray-800 mt-11 h-60 w-3/5 ml-56 rounded-3xl'>

        
        
        <input
        readOnly
        type='text'
        value = {password}
        className='mt-11 w-96'
        ref={passwordRef}
        
        >
        </input>
        <button onClick={copyCodetoClipboard} className='ml-20 bg-red-500 text-white w-36 rounded-lg hover:bg-black'>Copy</button>
        
        <div className='mt-6 -ml-60'>
     
        <input
         
         className='ml-4'
         type='range'
         min={8}
         max={25}
         onChange={(e)=> {inputLength(e.target.value)}}
         
        >
        
        </input>
        <label className='text-white'>Length : {length}</label>
       
          <input
           
           className='ml-4'
          type='checkbox'
          defaultChecked = {characterAllowed}
         onChange={()=>{
          setcharacterAllowed((previous) => !(previous))
         }}
        
          >
          
          </input>


          <label className='text-white' >Characters</label>
        

       

        <input

            
        
        className='ml-4'
        type='checkbox'
        defaultChecked = {numberAllowed}
        onChange={()=>{
        setNumberAllowed((previous) => !(previous))
        }}

        >

        </input>

        <label className='text-white'>Numbers</label>


        </div>
        
        </div>
      
      
    </>
  )
}

export default App
