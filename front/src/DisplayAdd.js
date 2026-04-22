import { useState, useEffect } from "react"

export default function Displaydd() {
    const [body, setBody] = useState(1);

    const [inputBrandAddValue, setInputBrandAddValue] = useState("")
    const [inputDisplayAddValue, setInputDisplayAddValue] = useState("")

    const [brands, setBrands] = useState([])

    const [displays, setDisplays] = useState([])

    const add_brand = (brand) => {
        fetch("http://localhost:5000/add_brand",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            brand
          })
        })
        .then(res=>res.json())
        .then(data=>{
            if (data[0]!==true){
                alert(data[1])
            }
            else {
                alert(data[1])
            }
        })
      }

    const get_brands = async () => {
        const res = await fetch("http://localhost:5000/get_brands",{
          method:"GET", headers:{"Content-Type":"application/json"}})
        const data = await res.json()

        setBrands(data[1]);
      }

    const get_models = async (brand) => {
        const res = await fetch("http://localhost:5000/get_models",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand
        })})
        const data = await res.json()

        if (data[0] != true){
            alert(data[1])
        }
        else{
            setDisplays(data[1])
        }
      }

    useEffect(()=>{
        get_brands()
    }, [])

    return (
        <div>
            <div className="flex justify-center pt-3 gap-5">
                <div>
                    <button className="border-2 rounded-xl px-3 py-2 border-black bg-blue-300 hover:bg-blue-600" onClick={()=>setBody(1)}>Добавить</button>
                </div>

                <div>
                    <button className="border-2 rounded-xl px-3 py-2 border-black bg-blue-300 hover:bg-blue-600" onClick={()=>setBody(2)}>Редактировать</button>
                </div>
            </div>

            <div className="mt-5">
                {body === 1 ? (
                    <div className="">
                        
                    </div>
                ) : (
                <div className="flex gap-[6vw]">
                    <div className="w-[47vw] text-center text-2xl flex flex-col gap-1">
                        <div className="flex gap-1">
                            <input 
                            className="w-full border-2 text-center" 
                            value={inputBrandAddValue} 
                            onChange={(e) => setInputBrandAddValue(e.target.value)}/>
                            <button 
                            className="border-2 px-2 hover:bg-gray-400"
                            onClick={()=>{
                                add_brand(inputBrandAddValue)
                            }}>Добавить</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {brands.map((item, index)=>(
                                <div key={index} className="border-2 flex cursor-pointer" onClick={()=>get_models(item)}>
                                    <div className="w-full">
                                    {item}
                                    </div>
                                    <div className="text-red-500 font-bold">
                                         x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-[47vw] text-center text-2xl">
                    <div className="flex gap-1">
                            <input 
                            className="w-full border-2 text-center" 
                            value={inputDisplayAddValue} 
                            onChange={(e) => setInputDisplayAddValue(e.target.value)}/>
                            <button 
                            className="border-2 px-2 hover:bg-gray-400"
                            onClick={()=>{

                            }}>Добавить</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}