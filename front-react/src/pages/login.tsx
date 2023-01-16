import {FormEvent, useContext, useEffect, useState} from "react";
import {AuthContextType, AuthContext, Auth} from "../contexts/AuthContext";
import axios from "axios";

export default function Login() {
    const context = useContext(AuthContext) as AuthContextType;
    const [errorState, setError] = useState<string | null>(null);
    let showError = false;

    useEffect(() => {
        let timer = setTimeout(() => setError(null), 4000);

        return () => {
            clearTimeout(timer);
        }
    }, [errorState]);

    if(context.auth) location.href = location.origin;

    const loginEvent = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const username = event.currentTarget.user.value;
        const password = event.currentTarget.password.value;

        try {
            const response = await axios.post<Auth>('http://localhost:3001/api/auth/token', {
                username, password
            });

            console.log(`Login Successful!`)

            context.setAuth(response.data);

            location.href = location.origin;
        }catch (e) {
            const { message } = e as any;

            setError(message)

            console.log(message);

            //alert(`Failed while trying to authenticate: ${JSON.stringify(e)}`)
        }

        console.log(`Login Attempt for => ${username}`);
    }

    return (
        <div className="flex w-full pt-20 items-center justify-center">
                {                    
                    errorState && <>
                        <div className="bg-red-600 opacity-30 rounded-md animate-pulse absolute right-1 top-20">
                            <p className="p-3 text-slate-50">
                                Credenciales invalidas!
                            </p>
                        </div>
                    </>
                }
            <div className="shadow-md px-10 py-6 shadow-red-200">
                <p className="text-3xl my-4 text-center border-b-orange-400 border-b-2" >Iniciar sesión</p>
                <form onSubmit={ loginEvent }>
                    <div className="pb-2 flex-col">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="userInput" className="font-mono">Usuario:</label>
                            <input className="outline-none border-b border-orange-300 focus:border-orange-500 transition-colors" id="userInput" name="user" type="text"></input>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="passwordInput" className="font-mono">Contraseña:</label>
                            <input className="outline-none border-b border-orange-300 focus:border-orange-500 transition-colors" id="passwordInput" name="password" type="password"></input>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <input className="mx-auto cursor-pointer bg-orange-400 px-16 py-1 rounded-sm text-slate-50 hover:bg-orange-600 transition-colors" type="submit" value="Ingresar"  />
                    </div>
                </form>
            </div>
        </div>
    )
}