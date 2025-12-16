import { useSelector } from "react-redux";
import EditProfile from "./ProfileEdit";

const Profile = () => {
    const user = useSelector((store) => store?.user?.user?.result?.data);
    return user && <div><EditProfile user={user} /></div>;
};

export default Profile;