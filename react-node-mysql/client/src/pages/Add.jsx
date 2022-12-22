import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    price:"",
    cover:"",
  });
  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:8880/books", book)
        navigate("/")
    } catch (error) {
        console.log(error)
    }
  }
  

  return (
    <div className='form'>
        <h1>Add Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
        <input type="text" placeholder='price' onChange={handleChange} name='price'/>
        <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Add