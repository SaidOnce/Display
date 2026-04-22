import { useState } from "react"

export default function Login(){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const send = () => {

        fetch("http://localhost:5000/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            login: login,
            password: password
          })
        })
        .then(res=>res.json())
        .then(data=>console.log(data.answer))
    
    }

    return (
        <div className="h-[90vh]">
            <div className="w-full h-full flex justify-center items-center gap-y-5">
                <div className="border-2 py-9 px-7 flex flex-col gap-y-5 rounded-3xl border-black shadow-2xl">
                    <div className="text-center">
                        LOGIN PAGE
                    </div>
                    <div>
                        <input value={login} onChange={(e) => setLogin(e.target.value)} className="border-b-2 outline-none" placeholder="Введите логин" />
                    </div>
                    <div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-2 outline-none" placeholder="Введите пароль" />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={()=>send()} className="border-2 py-2 px-4 rounded-lg border-blue-600">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}