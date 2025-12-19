import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { setMessage } from "../utils/messageSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get('/api/feed', { withCredentials: true });
            dispatch(addFeed(res?.data?.result?.data));
        } catch (error) {
            dispatch(setMessage({ message: "Not able to load feed", type: "error" }));
        }

    };
    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;
    if (feed.length <= 0) return <h1 className="flex justify-center py-10">No users available in feed!</h1>;
    return feed && (
        <div className="flex justify-center my-10"> <UserCard user={feed[0]} /> </div>
    );
};

export default Feed;