import Link from "next/link"
import { useState } from "react"
export default function Input() {
  const [userid, setUserid] = useState('')
  const handleChane = (e) => {
    setUserid(e.target.value)
  }

  return (
    
    <>
    <div 
    className="flex bg-gradient-to-r from-cyan-500 to-blue-500 flex-col items-center justify-center min-h-screen py-2"
    >
         <div class="relative z-0 w-1/3 mb-6 group">
        <input type="text" name="team_id" value={userid} onChange={handleChane} id="team_id" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User-id</label>
      </div>
      {/* a button which links to a url */}
      <Link href={`/user/${userid}`}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to User
        
      </Link>
    </div>
   </>
  )
}