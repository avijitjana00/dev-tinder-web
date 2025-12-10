import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [emailId, setEmailId] = useState("joseph@yopmail.com");
    const [password, setPassword] = useState("Joseph@123");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async() => {
        setSuccessMsg("");
        setErrorMsg("");
        try {
            const res = await axios.post("/api/login", { emailId, password }, { withCredentials: true } );
            const displayMessage = res?.data?.displayMessage || res?.data?.message || "Logged in successfully";
            setSuccessMsg(displayMessage);
        } catch (error) {
            const apiMsg = error?.response?.data?.message || error?.response?.data?.displayMessage;
            setErrorMsg(apiMsg || "Login failed. Please try again.");
        }
    }
    return (
        <div className="flex justify-center my-40">
            <div className="card bg-black w-96 shadow-xl">
                <div className="card-body space-y-2">
                    <h2 className="card-title justify-center">Login</h2>
                    {successMsg && (
                        <div className="alert alert-success text-sm">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="alert alert-error text-sm">
                            {errorMsg}
                        </div>
                    )}
                    <div>
                        <label className="form-control w-full max-w-xs py-4">
                            <div className="label">
                                <span className="label-text m-1">Email Id</span>
                            </div>
                            <input type="text" value={emailId} className="input input-bordered w-full max-w-xs" onChange={(e)=> setEmailId(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs py-4">
                            <div className="label">
                                <span className="label-text m-1">Password</span>
                            </div>
                            <input type="password" value = {password} className="input input-bordered w-full max-w-xs" onChange={(e)=> setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="card-actions flex justify-center">
                        <button className="btn bg-blue-600 text-white hover:bg-blue-70 rounded-full px-6" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;