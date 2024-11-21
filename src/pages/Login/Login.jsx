import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL_login } from "@/constants";
import { FaUnlock, FaUser } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { GiSpartanHelmet } from "react-icons/gi";
import { PulseLoader } from "react-spinners"
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const doSubmit = (e) => {
        setLoading(true);
        axios({
            method: "POST",
            url: API_URL_login,
            data: {
                username: username,
                password: password,
            },
        })
            .then((res) => {
                setLoading(false);
                if (res.data) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully!"
                    });
                    localStorage.setItem("jwt_refresh", res.data.jwt_refresh);
                    localStorage.setItem("jwt_access", res.data.jwt_access);
                    localStorage.setItem("key", res.data.key);
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("username", res.data.username);
                    navigate("/");
                }
            })
            .catch((err) => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Username/Password Salah!",
                    text: "Periksa lagi Username dan Password anda",
                });
            });
    };

    useEffect(() => {
        const jwt_access = localStorage.getItem("jwt_access");
        if (jwt_access) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='bg-gradient-to-b from-[#F4EEFF] via-[#DCD6F7] to-[#A6B1E1] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700'>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#0f172a] dark:bg-opacity-60 sm:px-16">
                <img src="/assets/images/coming-soon-object1.png" alt="object1" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2 dark:opacity-50" />
                <img src="/assets/images/coming-soon-object3.png" alt="object3" className="absolute right-0 top-0 h-[300px] dark:opacity-50" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg lg:dark:bg-gray-900 dark:bg-gray-800 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-gradient-to-br from-[#112D4E] to-[#3F72AF] p-5 dark:from-gray-800 dark:to-gray-700 lg:inline-flex lg:max-w-[835px] xl:-ms-28 xl:skew-x-[14deg]">
                        <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent -right-10 xl:w-16 xl:-right-20 dark:from-gray-600/10"></div>
                        <div className="xl:-skew-x-[14deg]">
                            <div className="flex items-center gap-2 ms-10 text-4xl text-white font-bold uppercase leading-snug">
                                <GiSpartanHelmet className="text-6xl"/>
                                <span>PROCASMON</span>
                            </div>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/login.svg" alt="Cover" className="w-full dark:opacity-75" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 py-16 lg:pb-56 lg:py-0 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px]">
                            <div className="mb-10 max-[1024px]:text-center">
                                <h1 className="text-3xl mb-2 font-bold uppercase leading-snug text-blue-600 dark:text-blue-400 md:text-4xl">Login</h1>
                                <p className="text-base font-bold leading-normal text-gray-400 dark:text-gray-300">Masukan Username dan Password</p>
                            </div>
                            <form onKeyPress={(e) => e.key === "Enter" && doSubmit()} className="space-y-5 dark:text-white">
                                <div>
                                    <label htmlFor="Username" className='font-bold text-gray-700 dark:text-gray-300'>Username</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type='username'
                                            name="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            placeholder="Enter Username"
                                            className="w-full px-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:border-gray-600"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                            <FaUser />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password" className='font-bold text-gray-700 dark:text-gray-300'>Password</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type={visiblePassword ? "text" : "password"}
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            placeholder="Enter Password"
                                            className="w-full px-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:border-gray-600"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                            <FaUnlock />
                                        </span>
                                        <div
                                            className="absolute text-gray-400 top-[8px] right-3 text-2xl cursor-pointer"
                                            onClick={() => setVisiblePassword(!visiblePassword)}
                                        >
                                            {visiblePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                                <button
                                    type="button"
                                    onClick={(e) => doSubmit(e)}
                                    disabled={loading ? true : false}
                                    className="w-full border-0 uppercase bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white py-2 rounded-lg shadow-lg hover:bg-gradient-to-l transition-shadow dark:from-gray-700 dark:to-gray-600"
                                >
                                    {loading ? <PulseLoader color="#FFF" /> : "Login"}
                                </button>
                            </form>
                            <p className="absolute bottom-2 left-48 hidden xl:block w-full text-center dark:text-white">© {new Date().getFullYear()}. QUEEN All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login