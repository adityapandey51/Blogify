import { useEffect, useState } from "react"
import axios from "axios";



export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "id":string,
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
   const [loggedin,setLoggedin]=useState(true)

    useEffect(() => {
        if(!localStorage.getItem('token')) {
           setLoggedin(false)
        }
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        loggedin,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loggedin,setLoggedin]=useState(true)


    useEffect(() => {
        if(!localStorage.getItem('token')) {
            setLoggedin(false)
         }
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        loggedin,
        blogs
    }
}