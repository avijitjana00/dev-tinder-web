import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setMessage } from "../utils/messageSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const isFormValid = isLoginForm
        ? (emailId.trim() && password.trim())
        : (firstName.trim() && lastName.trim() && emailId.trim() && password.trim());

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/api/login", { emailId, password }, { withCredentials: true });
            dispatch(addUser(res.data));
            const displayMessage = res?.data?.displayMessage || res?.data?.message || "Logged in successfully";
            dispatch(setMessage({ message: displayMessage, type: "success" }));
            setTimeout(() => navigate("/feed"), 1000);
        } catch (error) {
            const apiMsg = error?.response?.data?.message || error?.response?.data?.displayMessage;
            dispatch(setMessage({ message: "Login failed. Please try again with enter proper credential.", type: "error" }));
        }
    };

    const handleSignup = async () => {
        try {
            const res = await axios.post("/api/signup", { emailId, password, firstName, lastName }, { withCredentials: true });
            dispatch(addUser(res.data));
            const displayMessage = res?.data?.displayMessage || res?.data?.message || "Signed up successfully";
            dispatch(setMessage({ message: displayMessage, type: "success" }));
            setTimeout(() => navigate("/profile/view"), 1000);
        } catch (error) {
            dispatch(setMessage({ message: "Sign up failed. Please try sign up again", type: "error" }));
        }
    };

    return (
        <div className="flex justify-center my-40">
            <div className="card bg-black w-96 shadow-xl">
                <div className="card-body space-y-2">
                    <h2 className="card-title justify-center" > {isLoginForm ? "Login" : "Sign Up"} </h2>
                    <div>
                        {!isLoginForm && (<>
                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">First Name</span>
                                </div>
                                <input type="text" value={firstName} className="input input-bordered w-full max-w-xs" onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs py-4">
                                <div className="label">
                                    <span className="label-text m-1">Last Name</span>
                                </div>
                                <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e) => setLastName(e.target.value)} />
                            </label> </>)}
                        <label className="form-control w-full max-w-xs py-4">
                            <div className="label">
                                <span className="label-text m-1">Email Id</span>
                            </div>
                            <input type="text" value={emailId} className="input input-bordered w-full max-w-xs" onChange={(e) => setEmailId(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs py-4">
                            <div className="label">
                                <span className="label-text m-1">Password</span>
                            </div>
                            <input type="password" value={password} className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="card-actions flex justify-center">
                        <button
                            className={`btn rounded-full px-6 ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                            onClick={isLoginForm ? handleLogin : handleSignup}
                            disabled={!isFormValid}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>
                    <p className="m-auto cursor-pointer py-2 text-blue-500 underline hover:text-blue-700" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ? "New user? Sign Up here" : "Already have an account? Login here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;