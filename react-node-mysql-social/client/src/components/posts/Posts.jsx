import Post from "../post/Post";
import "./posts.scss"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

const Posts = ({userId}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get("/posts?userId="+userId).then(res => {
                return res.data;
            })
    })
    console.log(userId)

    return (
        <div className="posts">
            {error ? "Something went wrong!" : (isLoading ? "Loading..." :data && data.map(post => (
                <Post post={post} key={post.id} />
            )))}
        </div>
    )
}

export default Posts