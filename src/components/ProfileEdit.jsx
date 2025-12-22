import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setMessage } from "../utils/messageSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./userCard";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoURL] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveProfile = async () => {
        try {
            const res = await axios.patch("/api/profile/edit", {
                firstName: firstName?.trim() || "",
                lastName: lastName?.trim() || "",
                age: age ? parseInt(age.toString().trim()) : 0,
                gender: gender?.trim() || "",
                photoUrl: photoUrl?.trim() || "",
                about: about?.trim() || "",
                skills: typeof skills === 'string' && skills.trim() ? skills.trim().split(',').map(skill => skill.trim()) : (Array.isArray(skills) ? skills : [])
            }, { withCredentials: true });
            dispatch(addUser(res?.data));
            dispatch(setMessage({ message: "Profile updated successfully", type: "success" }));
            setTimeout(() => navigate("/profile/view"), 1000); // Navigate back to profile view after success
        } catch (error) {
            const apiMsg = error?.response?.data?.message || error?.response?.data?.displayMessage;
            dispatch(setMessage({ message: `Profile update failed. reason is ${apiMsg}`, type: "error" }));
        }
    };
    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card bg-black w-96 shadow-xl">
                    <div className="card-body space-y-2">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">First Name</span>
                                </div>
                                <input type="text" value={firstName || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setFirstName(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Last Name</span>
                                </div>
                                <input type="text" value={lastName || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setLastName(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Age</span>
                                </div>
                                <input type="text" value={age || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setAge(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Gender</span>
                                </div>
                                <input type="text" value={gender || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setGender(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Photo URL</span>
                                </div>
                                <input type="text" value={photoUrl || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setPhotoURL(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Skills</span>
                                </div>
                                <input type="text" value={skills || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setSkills(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">About</span>
                                </div>
                                <input type="text" value={about || ""} className="input input-bordered w-full max-w-xs pl-3" onChange={(e) => setAbout(e.target.value)} />
                            </label>
                        </div>
                        <div className="card-actions flex justify-center">
                            <button className="btn bg-blue-600 text-white hover:bg-blue-70 rounded-full px-6" onClick={saveProfile}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, photoUrl, skills, about }}></UserCard>
        </div>
    );
};

export default EditProfile;