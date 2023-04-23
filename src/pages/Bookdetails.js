import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Editbook } from "./Editbook";

export const Bookdetails=(props)=>{
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchBook = async()=>{
        try{
            
            const res = await axios.get(`http://localhost:5000/books/${props.book._id}`);
            setBook(res.data);
        }catch(err){
            setError(err.response.data.message);
        }
    }

    return(
        <div>
            
            <button onClick={fetchBook}>View details</button>
        
            {book && (
                <div>
                    <p>ISBN No: {book.isbn}</p>
                    <p>Description: {book.description}</p>
                    
                    <p>Published Date: {book.published_date}</p>
                    <p>Publisher: {book.publisher}</p>
                    <button onClick={()=>navigate(`/editbook/${book._id}`)}>Edit</button>
                    <Editbook book={book}/>
                </div>
            )}
        </div>
    )

}