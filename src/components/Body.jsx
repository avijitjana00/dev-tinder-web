import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from '../common/constants.js';
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get("/api/profile/view", { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (error) {
            if (error.response.status === 500 || error.response.status === 401) {
                navigate("/login");
            }
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};
export default Body;