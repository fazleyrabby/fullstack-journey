import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { makeRequest } from "../../axios"
import "./update.scss"

const Update = ({setOpenUpdate, user}) => {
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        name:"",
        city:"",
        website:"",
    })
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("upload", formData)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>{
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (user) => {
            return makeRequest.put("/users", user)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        let coverUrl = user.coverPic;
        let profileUrl = user.profilePic;
        // if(file) imgUrl = await upload();

        coverUrl = cover && await upload(cover)
        profileUrl = cover && await upload(profile)

        mutation.mutate({ ...texts, coverPic:coverUrl, profilePic: profileUrl })
        setOpenUpdate(false)
    }
  return (
    <div className="update">
        <form>

        <input type="file" />
        <input type="file" />
        <input type="text" name="change" onChange={handleChange}/>
        <input type="text" name="city" onChange={handleChange}/>
        <input type="text" name="website" onChange={handleChange}/>
        <button onClick={handleSubmit}>Update</button>
        </form>
        <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update