import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
      const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8880/books")
            setBooks(response.data)
        } catch (error) {
            console.log(error)
        }
      }
      fetchBooks()
    }, [])
    const handleDelete = async id => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete("http://localhost:8880/books/"+id)
                window.location.reload()
            } catch (error) {
                console.log(error)
            } 
        } 
    }
    return (
        <div>
            <h1>Book Shop</h1>
            <div className='books'>
                {books.length && books.map(book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'>
                            <Link to={`/update/${book.id}`}>Update</Link>
                        </button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add New Book</Link></button>
        </div>
    )
}

export default Books