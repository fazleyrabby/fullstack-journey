import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../components/Perks.jsx";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1)

    async function addPhotoByLink(e){
        e.preventDefault()
        const {data: filename} = await axios.post('/upload', {link: photoLink})
        setAddedPhotos(prev => {
            return [...prev, filename]
        })
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
                          to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add New Place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className='text-md mt-4'>Title</h2>
                        <input type='text' placeholder='Title'
                               value={title}
                               onChange={e => setTitle(e.target.value)}/>
                        <h2 className='text-md mt-4'>Address</h2>
                        <input type='text' placeholder='Address'
                               value={address}
                               onChange={e => setAddress(e.target.value)}/>
                        <h2 className='text-md mt-4'>Photos</h2>
                        <div className='flex gap-2'>
                            <input type='text' placeholder='Add using a link ...jpg/png'
                                   value={photoLink}
                                   onChange={e => setPhotoLink(e.target.value)}/>
                            <button className="bg-gray-200 grow rounded-2xl px-4" onClick={addPhotoByLink}>Add&nbsp;Photo</button>
                        </div>
                        <div className='grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2'>
                            <button
                                className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                                </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className='text-md mt-4'>Description</h2>
                        <textarea value={description}
                                  onChange={e => setDescription(e.target.value)}/>

                        <h2 className='text-md mt-4'>Perks</h2>
                        <Perks selected={perks} onChange={setPerks}/>
                        <h2 className='text-md mt-4'>Extra Info</h2>
                        <textarea value={extraInfo}
                                  onChange={e => setExtraInfo(e.target.value)}/>

                        <h2 className='text-md mt-4'>Checkin & out times</h2>
                        <div className='grid sm:grid-cols-3 gap-2 mt-2'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check In</h3>
                                <input type='text' placeholder='14:00'
                                       value={checkIn}
                                       onChange={e => setCheckIn(e.target.value)}/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check out</h3>
                                <input type='text' placeholder='16:00'
                                       value={checkOut}
                                       onChange={e => setCheckOut(e.target.value)}/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max Guests</h3>
                                <input type='number' placeholder='3'
                                       value={maxGuests}
                                       onChange={e => setMaxGuests(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button className='primary my-4'>Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}