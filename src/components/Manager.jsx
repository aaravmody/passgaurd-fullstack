import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import copy from '/copy.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getpass =async ()=>{
        let req = await fetch("http://localhost:3000")
        let passwords = await req.json()
        if (passwords) {
            setpasswordArray(passwords)
        }
    }

    useEffect(() => {
        getpass()
        
    }, [])

    const showPass = () => {
        ref.current
        if (ref.current.src.includes("eyecross.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const savePass = () => {
        console.log(form)
        setpasswordArray([...passwordArray, {...form,id: uuidv4()}])
        localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast.success('Password added successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
}

    const deletePass = (id) => {
        console.log("Deleting pass")
        let c = confirm("Do you really want to delete this password?")
        if(c){
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
    }

    const editPass = (id) => {
        console.log("Deleting pass")
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className="mx-auto p-3 md:mycontainer">
                <h1 className='text-4xl text-blue-900 text-center gap-2'>PassGuard</h1>
                <p className='text-lg text-center py-2'>Your own Password Manager</p>
                <div className='text-white flex flex-col p-4 gap-6 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-800 w-full text-black p-4 py-1' type="text" name='site' id='site' />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-blue-800 w-full text-black p-4 py-1' type='text' name='username' id='username'>
                        </input>

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-800 w-full text-black p-4 py-1' type='password' name='password' id='password'/>
                            <span className='absolute right-[3px] top-[2px] cursor-pointer' onClick={showPass} >
                                <img ref={ref} className='p-1' width={26} src="eye.png" alt='eye' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePass} className='flex justify-center items-center text-blue-900 rounded-full px-8 py-2 w-fit bg-green-200 hover:bg-green-300 gap-2 font-semibold border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 text-blue-900'>Your Passwords </h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-5">
                        <thead className='w-full bg-purple-800 text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-300'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='items-center justify-center text-center py-2 border border-white'><a href={item.site} target='_blank' >{item.site} </a> </td>
                                    <td className='items-center justify-center text-center py-2 border border-white'>{item.username}</td>
                                    <td className='items-center justify-center text-center py-2 h-30 border border-white flex gap-3'>{item.password} <img className='cursor-pointer' onClick={() => { copyText(item.password) }} src={copy} height={1} width={18} /></td>
                                    <td className='items-center justify-center text-center py-2 border border-white'> <span className='cursor-pointer mx-1 gap-4' onClick={()=> {{editPass(item.id)}}}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/ylvuooxd.json"
                                            trigger="hover"
                                            state="hover-line"
                                            colors="primary:#ebe6ef,secondary:#f9c9c0,tertiary:#646e78,quaternary:#000000">
                                        </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1 gap-4' onClick={()=> {{deletePass(item.id)}}}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/hjbrplwk.json"
                                            trigger="hover"
                                            colors="primary:#646e78,secondary:#1b1091,tertiary:#ebe6ef,quaternary:#3a3347">
                                        </lord-icon></span></td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager