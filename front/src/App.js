import "tailwindcss/tailwind.css"

export default function App() {

  const send = () => {

    fetch("http://localhost:5000/api",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        text: "text"
      })
    })
    .then(res=>res.json())
    .then(data=>console.log(data.answer))

  }

  return (
    <div className="flex justify-center">
      <div className="mt-2">
        <button onClick={()=>send()} className="border-2 border-black px-4 py-2">
          SEND AND RECIVE
        </button>
      </div>
    </div>
  )
}