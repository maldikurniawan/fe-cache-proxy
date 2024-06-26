import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiUser } from "react-icons/bi"
import { AiOutlineUnlock } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { login, reset, getUserInfo } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import logo from "../assets/images/logo-cache.png";

const Login = () => {

    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
        dispatch(getUserInfo())

    }, [isError, isSuccess, user, navigate, dispatch])

    return (
        <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{ "background": "url('../src/assets/bg.jpg')" }}>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <div className="flex justify-center">
                    <img src={logo} alt="logo" className="w-48 drop-shadow-lg" />
                </div>
                <form action="">
                    <div className="relative my-4">
                        <input type="email" name="email" onChange={handleChange} value={email} required className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" autoComplete="off" />
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                        <BiUser className="absolute top-4 right-4" />
                    </div>
                    <div className="relative my-4">
                        <input type="password" name="password" onChange={handleChange} value={password} required className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                        <AiOutlineUnlock className="absolute top-4 right-4" />
                    </div>
                    {/* <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="Remember Me">Remember Me</label>
                        </div>
                        <Link to="" className="text-blue-500">Forgot Password?</Link>
                    </div> */}
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-fuchsia-800 hover:bg-fuchsia-600 hover:text-white py-2 transition-colors duration-300" type="Submit" onClick={handleSubmit}>Login</button>
                    {/* <div>
                        <span className="m-4">New Here? <Link className="text-blue-500" to="#">Create an Account</Link></span>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default Login