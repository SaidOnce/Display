import { useState, useEffect } from "react"

export default function DisplayAdd() {
    const [body, setBody] = useState(1);

    const [inputBrandAddValue, setInputBrandAddValue] = useState("");
    const [inputModelAddValue, setInputModelAddValue] = useState("");
    const [inputSparePartAddValue, setInputSparePartAddValue] = useState("");

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [sparePartTypes, setSparePartTypes] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    const [submitMenu, setSubmitMenu] = useState(false);

    const [submitContent, setSubmitContent] = useState("");

    const add_brand = async (brand) => {
        try {
            const res = await fetch("http://localhost:5000/add_brand", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ brand })
            });

            const data = await res.json();

            alert(data[1]);

            if (data[0] === true) {
            await get_brands();
            }
        } catch (err) {
            console.error(err);
            alert("Ошибка при добавлении бренда");
        }
    };
    

      const add_model = async (brand, model) => {
        console.log(brand, model)
        const res = await fetch("http://localhost:5000/add_model",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            brand,
            model
          })
        })
        const data = await res.json()
        if (data[0]!==true){
            alert(data[1])
        }
        else {
            alert(data[1]);
            get_models(selectedBrand);
        }
      }


    const get_brands = async () => {
        const res = await fetch("http://localhost:5000/get_brands",{
          method:"GET", headers:{"Content-Type":"application/json"}})
        const data = await res.json()

        setBrands(data[1]);
        setModels([]);
        setSparePartTypes([]);
      }

    useEffect(()=>{
        get_brands()
    }, [])

    const get_models = async (brand) => {
        const res = await fetch("http://localhost:5000/get_models",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand
        })})
        const data = await res.json()

        if (data[0] !== true){
            alert(data[1])
        }
        else{
            setModels(data[1])
            setSparePartTypes([]);
        }
      }


    const rem_brand = async () => {
        const res = await fetch("http://localhost:5000/rem_brand",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand: submitContent[1]
        })})
        const data = await res.json()
        if (data[0] !== true){
            alert(data[1])
        }
        else{
            await get_brands();
            setSubmitMenu(false);
            setModels([]);
            setSparePartTypes([]);
            alert(data[1]);
        }
    }


    const rem_model = async () => {
        const res = await fetch("http://localhost:5000/rem_model",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand: selectedBrand,
            model: submitContent[1]
        })})
        const data = await res.json();
        if (data[0] === true){
            get_models(selectedBrand);
            setSparePartTypes([]);
            alert(data[1]);
            setSubmitMenu(false);
        }
        else {
            alert(data[1]);
        }
    }

    const get_spare_part_types = async (model) => {
        const res = await fetch("http://localhost:5000/get_spare_part_types",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand: selectedBrand,
            model
            
        })})
        const data = await res.json()

        if (data[0] === true){
            setSparePartTypes(data[1]);
        }
        else {
            alert(data[1]);
        }

      }

      
      const add_spare_part_type = async (brand, model, sparePartType) => {
        const res = await fetch("http://localhost:5000/add_spare_part_type",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            brand,
            model,
            sparePartType
          })
        })
        const data = await res.json()
        if (data[0]!==true){
            alert(data[1]);
        }
        get_spare_part_types(model);
          }


      const rem_spare_part_type = async () => {
        const res = await fetch("http://localhost:5000/rem_spare_part_type",{
          method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            brand: selectedBrand,
            model: selectedModel,
            sparePartType: submitContent[1]
        })})
        const data = await res.json();
        if (data[0] === true){
            get_spare_part_types(selectedModel);
            alert(data[1]);
            setSubmitMenu(false);
        }
        else {
            alert(data[1]);
        }
    }


    const threeRoot = "w-[33vw] text-center text-2xl flex flex-col"
    return (
        <div className="relative">
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
                <div className="flex gap-[.5vw]" data-comment="РОДИТЕЛЬ убрал gap-6vw">

                    <div className={`${threeRoot}`} data-comment="бренды">
                        <div className="flex gap-1 mb-2">
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
                                <div key={index} className="border-2 flex cursor-pointer" onClick={()=>{
                                    setSelectedBrand(item);
                                    get_models(item);
                                }}>
                                    <div className="w-full">
                                        {item}
                                    </div>
                                    <div className="text-red-500 font-bold" onClick={()=>{
                                        setSubmitContent([0, item]);
                                        setSubmitMenu(true);
                                    }}>
                                         x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${threeRoot}`} data-comment="модели">
                        <div className="flex gap-1 mb-2">
                            <input 
                            className="w-full border-2 text-center" 
                            value={inputModelAddValue} 
                            onChange={(e) => setInputModelAddValue(e.target.value)}/>
                            <button 
                            className="border-2 px-2 hover:bg-gray-400"
                            onClick={()=>{add_model(selectedBrand, inputModelAddValue)}}>Добавить</button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {models.map((item, index)=>(
                                <div key={index} className="w-full border-2 flex cursor-pointer">
                                    <div className="w-full" onClick={()=>{
                                        setSelectedModel(item);
                                        get_spare_part_types(item);
                                    }}>
                                        {item}
                                    </div>
                                    <div className="text-red-500 font-bold" onClick={()=>{
                                        setSubmitContent([1, item]);
                                        setSubmitMenu(true);
                                    }}>
                                         x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${threeRoot}`} data-comment="запчасти">
                        <div className="flex gap-1 mb-2">
                            <input 
                            className="w-full border-2 text-center" 
                            value={inputSparePartAddValue} 
                            onChange={(e) => setInputSparePartAddValue(e.target.value)}/>
                            <button 
                            className="border-2 px-2 hover:bg-gray-400"
                            onClick={()=>{add_spare_part_type(selectedBrand, selectedModel, inputSparePartAddValue)}}>Добавить</button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {sparePartTypes.map((item, index)=>(
                                <div key={index} className="w-full border-2 flex cursor-pointer">
                                    <div className="w-full" onClick={()=>setMenuOpen(true)}>
                                        {item}
                                    </div>
                                    <div className="text-red-500 font-bold" onClick={()=>{
                                        setSubmitContent([2, item]);
                                        setSubmitMenu(true);
                                    }}>
                                         x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}
            </div>

            {submitMenu && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
                {console.log("isModel: " + Boolean(submitContent[0]))}
                  {/* Само меню */}
                  <div className="w-full max-w-xl h-[20vh] bg-gray-200 rounded-3xl p-8 text-white relative flex flex-col">
                    {/* Кнопка закрытия */}
                    <button onClick={() => setSubmitMenu(false)} className="absolute top-4 right-4 text-2xl text-red-500 font-bold">✕</button>
                    <div className="text-center text-black text-2xl">
                        Вы действительно хотите удалить <span className="font-bold text-orange-400">{submitContent[1]}</span> ? 
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-4">
                            <button onClick={()=>{
                                if (submitContent[0] === 0){
                                    rem_brand();
                                }
                                else if (submitContent[0] === 1) {
                                    rem_model();
                                }
                                else if (submitContent[0] === 2) {
                                    rem_spare_part_type();
                                }
                            }} className="text-black border-2 border-black w-full px-4 py-2 rounded-xl text-3xl transition-all duration-200 hover:opacity-50">
                                Да
                            </button>
                            <button onClick={() => setSubmitMenu(false)} className="text-black border-2 border-black w-full px-4 py-2 rounded-xl text-3xl transition-all duration-200 hover:opacity-50">
                                Нет
                            </button>
                    </div>
                  </div>
                </div>
            )}

            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
                  {/* Само меню */}
                  <div className="w-full max-w-7xl h-[90vh] bg-[#1f1f1f] rounded-3xl p-8 text-white relative overflow-auto">
                    {/* Кнопка закрытия */}
                    <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-2xl">✕</button>
                    
                  </div>
                </div>
            )}
        </div>
    )
}