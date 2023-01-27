import Header from "../components/Header.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function LoginPage(){
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    async function handleLogin(e){
        e.preventDefault()
        try {
            await axios.post('/login', {email, password})
        }catch (e) {
            alert('Login Failed!')
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='test@email.com'/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
                    <button type='submit' className='primary'>Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}