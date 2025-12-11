import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearMessage } from "../utils/messageSlice";

const MessageDisplay = () => {
    const { message, type } = useSelector((store) => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
            }, 3000); // Auto-clear after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    const bgColor = type === "success" ? "alert-success" : type === "error" ? "alert-error" : "alert-info";

    return (
        <div className={`alert ${bgColor} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg`}>
            <span>{message}</span>
        </div>
    );
};

export default MessageDisplay;