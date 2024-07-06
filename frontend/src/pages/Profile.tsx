import axios from "axios"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Avatar, BlogCard } from "../components/BlogCard"

interface User{
    name:string,
    posts:{
        id:string,
        title:string,
        content:string
    }[]   
}

export const Profile=()=>{

    const {authorid}=useParams()
    const [user,setUser]=useState<User>({
        name:"",
        posts:[{
            id:"",
            title:"",
            content:""
        }]
    })

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${authorid}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
            .then(response=>{
                setUser(response.data.user)
            })

    },[authorid])

    return (
        <div>
        <Appbar />
        <div className="flex justify-center pt-">
        <div  className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
            <div className="col-span-8">
                {user.posts.length===0?<div className="text-[20px] font-bold pt-4">No Posts of this user</div>:user.posts.map(blog => <BlogCard
                    authorId={authorid || ""}
                    id={blog.id}
                    authorName={user.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
       
        <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar authorId={authorid || ""} size="big" name={user.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {user.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                </div>

          </div>
    </div>)
}