import { Avatar } from "./BlogCard"
import { Link,useNavigate } from "react-router-dom"

export const Appbar = () => {
    const userName=localStorage.getItem("userName");
    const userId=localStorage.getItem("userId");
    const navigate=useNavigate()

    return (
      <div className="border-b flex bg-slate-50 justify-between px-10 py-4">
        <Link
          to={"/blogs"}
          className="flex flex-col justify-center cursor-pointer"
        >
          <div className="flex justify-center">
            <span className="font-bold text-2xl">B</span>
            <span className="text-2xl font-thin">logify</span>
          </div>
        </Link>
        <div>
          <Link to={`/publish`}>
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              New
            </button>
          </Link>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              navigate("/signin");
            }}
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Log Out
          </button>

          <Avatar authorId={userId || ""} size={"big"} name={userName || ""} />
        </div>
      </div>
    );
}