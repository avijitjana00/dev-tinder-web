import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { setMessage } from "../utils/messageSlice";

const NavBar = () => {
    const user = useSelector((store) => store?.user?.user?.result?.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(setMessage({ message: "Logged out successfully!", type: "success" }));
            setTimeout(() => {
                navigate("/login");
            }, 1000); // Show message for 1 second before redirect
        } catch (error) {
            dispatch(setMessage({ message: "Error during logout", type: "error" }));
        }
    };
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">DevTinder😍</Link>
            </div>
            {user && (
                <div className="flex-none gap-3 flex items-center">
                    <div className="text-sm font-medium">
                        Welcome, {user?.firstName}
                    </div>
                    <div className="dropdown dropdown-end mx-1 flex">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user profile photo"
                                    src={user?.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile/view" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;