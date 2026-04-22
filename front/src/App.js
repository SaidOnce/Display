import "tailwindcss/tailwind.css"
import Login from "./Login"
import { useState } from "react"
import Displaydd from "./DisplayAdd"

const btnHeaderStyle = "px-6 text-4xl border-x-2 border-black py-3" 

export default function App() {
  const [page, setPage] = useState("login")
  

  const renderPage = () => {
    if (page === "login") return <Login />
    if (page === "displayadd") return <Displaydd />
  }
  

  return (
    <div>
      <div className="fixed top-0 w-full border-b-2 border-b-gray-500 h-[10vh] overflow-hidden">
        <div className="h-[10vh] flex justify-center gap-5 items-center">
          <div>
            <button onClick={()=>setPage("login")} className={btnHeaderStyle}>
              Login
            </button>
          </div>

          <div>
            <button onClick={()=>setPage("displayadd")} className={btnHeaderStyle}>
              DisplayAdd
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[10vh]">
        {renderPage()}
      </div>
    </div>
  )
}