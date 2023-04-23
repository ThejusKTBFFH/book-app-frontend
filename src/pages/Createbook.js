import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

export const Createbook = () =>{
    const userID = useGetUserID();
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

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const res = await axios.post("https://book-app-backend-7hg6.onrender.com/books/",{...book}, {headers:{authorization: cookies.access_token},
            });
            alert("Book created");
            navigate("/");
                
    }catch(err){
       console.log(err);
    }

}

    return(

        <div className="create-book">
            <h2>Create Book</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Create Book</button>
            </form>

        </div>

    )


}