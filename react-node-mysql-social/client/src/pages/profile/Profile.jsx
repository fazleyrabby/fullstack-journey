import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import Update from "../../components/update/Update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const userId = parseInt(useLocation().pathname.split("/")[2])
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then(res => {
        return res.data;
      })
  })

  const { isLoading: relationLoading, data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then(res => {
        return res.data;
      })
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
      mutationFn: (following) => {
          if(following) return makeRequest.delete("/relationships?userId="+ userId)
          return makeRequest.post("/relationships", {userId })
      },
      onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['relationship'] })
      },
  })

  const handleFollow = () => {
    mutation.mutate(relationshipData && relationshipData.includes(currentUser.id))
  }

  return (
    <>
      {isLoading ? 'Loading...' : data && (
        <div className="profile">
          <div className="images">
            <img
              src={data?.coverPic}
              alt=""
              className="cover"
            />
            <img
              src={data?.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {relationLoading ? "loading..." : currentUser.id === userId ? (<button onClick={() => setOpenUpdate(true)}>Update</button>) : <button onClick={handleFollow}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>}
                
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId}/>
          </div>
        </div>
      )}
      {openUpdate && <Update user={data} setOpenUpdate={setOpenUpdate}/>}
    </>

  );
};

export default Profile;
