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

    const upload = async (file) => {
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
        setTexts((prev) => ({...prev, [e.target.name]: e.target.value}))
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
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) :user.coverPic
        profileUrl = profile ? await upload(profile) :user.profilePic

        mutation.mutate({ ...texts, coverPic:coverUrl, profilePic: profileUrl })
        setOpenUpdate(false)
        setCover(null);
        setProfile(null);
    }
  return (
    <div className="update">
        <div className="wrapper">
        <form>
        <input type="file" onChange={e => setCover(e.target.files[0])}/>
        <input type="file" onChange={e => setProfile(e.target.files[0])}/>
        <input type="text" name="name" onChange={handleChange}/>
        <input type="text" name="city" onChange={handleChange}/>
        <input type="text" name="website" onChange={handleChange}/>
        <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
        </div>
    </div>
  )
}

export default Update