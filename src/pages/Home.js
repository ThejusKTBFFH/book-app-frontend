import React, {useEffect, useState} from "react";

import { useGetUserID } from "../hooks/useGetUserID";

import axios from "axios";
import { Createbook } from "./Createbook";
import { Bookdetails } from "./Bookdetails";
import { useNavigate } from "react-router-dom";

export const Home = () =>{
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userID = useGetUserID();

    useEffect(()=>{

        const fetchBooks = async() =>{
            try{
                const res = await axios.get(`https://book-app-backend-7hg6.onrender.com/books/`);
                setBooks(res.data);
                setLoading(false);
            }catch(err){
                setError(err);
                setLoading(false);
                console.log(err);
            }
        }
       fetchBooks();
    },[userID]);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error</div>
    }

  
    return(
        <div>
            <h1>Home</h1>
            <div className="book-list">
                {books.map(book =>(
                    <div className="book-preview" key={book.id}>
                        <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="sample"/>
                        <h2>{book.title}</h2>
                        <p>Written by {book.author}</p>
                       
                        <Bookdetails book={book}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
