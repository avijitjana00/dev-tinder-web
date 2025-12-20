import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../utils/messageSlice";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { DEFAULT_PROFILE_IMAGE } from "../common/constants";

const Requests = () => {
    const requests = useSelector((store) => store?.request || []);
    const dispatch = useDispatch();

    const handleRequest = async (status, _id) => {
        try {
            const res = axios.post("/api/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
            const displayMessage = res?.data?.displayMessage || res?.data?.message || "Request reviewed successfully";
            dispatch(setMessage({ message: displayMessage, type: "success" }));
        } catch (error) {
            dispatch(setMessage({ message: "Not able to review the request", type: "error" }));
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get('/api/user/pending/request', { withCredentials: true });
            dispatch(addRequest(res?.data?.result?.data || []));
            const displayMessage = res?.data?.displayMessage || res?.data?.message || "Request reviewed successfully";
            dispatch(setMessage({ message: displayMessage, type: "success" }));
        } catch (error) {
            dispatch(setMessage({ message: "Not able to load your pending connection history", type: "error" }));
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;
    if (requests.length === 0) return <h1 className="flex justify-center py-10">No request found</h1>;
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Requested Connections</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, gender, age, about } = request.fromUserId;
                return (
                    <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                        <div className="flex items-center mb-4">
                            <div>
                                <img alt="photo" className="w-65 h-35 rounded-full object-cover" src={photoUrl || DEFAULT_PROFILE_IMAGE} />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age} yrs | {gender}</p>}
                                <p>{about}</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="btn bg-purple-500 hover:bg-purple-600 text-white border-none rounded-full px-8 shadow-[0_8px_16px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_8px_rgba(147,51,234,0.4)] transform hover:-translate-y-1 transition-all duration-200" onClick={() => handleRequest("rejected", request._id)}>Reject</button>
                            <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none rounded-full px-8 shadow-[0_8px_16px_rgba(236,72,153,0.3)] hover:shadow-[0_4px_8px_rgba(236,72,153,0.4)] transform hover:-translate-y-1 transition-all duration-200" onClick={() => handleRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;