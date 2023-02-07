import {Link, useParams} from "react-router-dom";

export default function PlacesPage(){
    const {action} = useParams();
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                </div>
            )}
            {action ==='new' && (
                <div>
                    <form>
                        <h2 className='text-md mt-4'>Title</h2>
                        <input type='text' placeholder='Title'/>
                        <h2 className='text-md mt-4'>Address</h2>
                        <input type='text' placeholder='Address'/>
                        <h2 className='text-md mt-4'>Photos</h2>
                        <div>
                            <input type='text' placeholder='Add using a link ...jpg/png'/>
                        </div>
                        <div className='grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2'>
                            <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">+</button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}