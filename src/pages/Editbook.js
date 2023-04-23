import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

export const Editbook =(props)=>{

    const [cookies,_] = useCookies(["access_token"]);
    const [book, setBook] = useState({
        title:"",
        isbn:"",
        author:"",
        description:"",
        published_date:"",
        publisher:"",
    })

    const navigate = useNavigate();

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setBook({...book, [name]: value})
    }

    const handleEdit = async(event)=>{
        event.preventDefault();
        try{
            const res = await axios.put(`https://book-app-backend-7hg6.onrender.com/books/${props.book._id}`,{...book}, {headers:{authorization: cookies.access_token},
            });
            alert("Book Edited");
            navigate("/");
                
    }catch(err){
       console.log(err);
    }

}

    const handleDelete = async(event)=>{
        event.preventDefault();

        try{
            const res = await axios.delete(`https://book-app-backend-7hg6.onrender.com/books/${props.book._id}`, {headers:{authorization: cookies.access_token},
            });
            alert("Book Deleted");
            navigate("/");
                
    }catch(err){
       console.log(err);
    }

        
    }

    return(
        <div className="create-book">
        <h2>Edit Book</h2>
        <form onSubmit={handleEdit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={book.title} onChange={handleChange}/>

            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" value={book.isbn} onChange={handleChange}/>

            <label htmlFor="author">Author</label>
            <input type="text" name="author" value={book.author} onChange={handleChange}/>

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={book.description} onChange={handleChange}></textarea>

            <label htmlFor="published_date">Published Date</label>
            <input type="text" name="published_date" value={book.published_date} onChange={handleChange}/>

            <label htmlFor="publisher">Publisher</label>
            <input type="text" name="publisher" value={book.publisher} onChange={handleChange}/>
            <button type="submit">Edit Book</button>
            <button onClick={handleDelete}>Delete</button>
        </form>

    </div>
    )
}