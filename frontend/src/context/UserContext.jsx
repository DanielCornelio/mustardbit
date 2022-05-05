import axios from "axios";
import Swal from "sweetalert2";
import {createContext, useContext, useState} from "react"

const UserContext = createContext()
const initialState = {login:false, token: "", name:""}

export const UserProvider = (props)=>{
    const [user,setUser]=useState(initialState)

    const loginUser = async(dataUser,navigate)=>{
        try {
            const {data} =  await axios.post('http://localhost:4000/api/login',dataUser)
            if(data.ok){
                const userLogin = {
                    login:true,
                    token:data.data.token,
                    name:data.data.nombre
                }
                localStorage.setItem("user",JSON.stringify(userLogin))
                setUser(userLogin)
                navigate('/employees')
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        } catch (error) { 
            if(!error.response.data.ok){
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            console.log("error en la funcion login", error.message)          
        }        
    }

    const exit = ()=>{
        setUser(initialState)
        localStorage.removeItem("user")
    }

    const value={
        loginUser,
        user,
        exit
    }
    return <UserContext.Provider value={value}{...props}/>
}

export function useUser(){
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser Error')
    }
    return context
}