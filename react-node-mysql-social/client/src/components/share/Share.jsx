import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser)
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={currentUser.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind`}
                            // value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share