import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc:"",
    price:"",
    cover:"",
  });
  const navigate = useNavigate()
  const location = useLocation()
  const bookID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  useEffect(() => {
    const fetchBook = async () => {
      try {
          const response = await axios.get("http://localhost:8880/books/"+bookID)
          setBook(response.data)
      } catch (error) {
          console.log(error)
      }
    }
    fetchBook()
  }, [])


  const handleClick = async e => {
    e.preventDefault()
    try {
        await axios.put("http://localhost:8880/books/"+bookID , book)
        navigate("/")
    } catch (error) {
        console.log(error)
    }
  }
  

  return (
    <div className='form'>
        <h1>Update Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title' value={book.title}/>
        <input type="text" placeholder='desc' onChange={handleChange} name='desc' value={book.desc}/>
        <input type="text" placeholder='cover' onChange={handleChange} name='cover' value={book.cover}/>
        <input type="text" placeholder='price' onChange={handleChange} name='price' value={book.price}/>
        <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Update