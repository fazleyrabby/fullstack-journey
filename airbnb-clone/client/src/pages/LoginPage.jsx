import Header from "../components/Header.jsx";

export default function LoginPage(){
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder='test@email.com'/>
                    <input type="password" placeholder='Password'/>
                    <button className='primary'>Login</button>
                </form>
            </div>
        </div>
    )
}