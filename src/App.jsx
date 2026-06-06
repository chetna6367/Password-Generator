import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'


function App() {
  const [Password, setPassword] = useState("")
  const [length, setLength] = useState(5);
  const [numberChange, setnumberChange] = useState(false);
  const [charChange, setcharChange] = useState(false);

  const passwordRef = useRef(null)

     const generatpassward = useCallback(()=>{
  
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (numberChange){
            str+="0123456789"
        }
        if(charChange){
            str+="+-*&^%$#@!()~`{}"
    }
        let pass = "";

        for(let i=0; i<length;i++){
           pass+= str[Math.floor(Math.random()*str.length)]
        }
        setPassword(pass)
    

   },[length,numberChange,charChange])
  
   const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
   })

    useEffect(()=>{
        generatpassward()
    },[generatpassward])

  return (
   
        <>
   <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    
    <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
  <input
    type="text"
    value={Password}
    readOnly
    ref={passwordRef}
    className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
  />

  <button
    onClick={copyPasswordToClipboard}
    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition duration-200"
  >
    Copy
  </button>
</div>

      <div className="space-y-4">

        <div>
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <label className="text-orange-400 font-medium">
            Length: {length}
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numberChange}
            onChange={() => setnumberChange(!numberChange)}
            className="w-4 h-4"
          />
          <label className="text-white">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={charChange}
            onChange={() => setcharChange(!charChange)}
            className="w-4 h-4"
          />
          <label className="text-white">
            Include Special Characters
          </label>
        </div>

      </div>
    </div>

  </div> 
 
</>
  )
}

export default App
