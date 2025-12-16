const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, photoUrl, skills, about } = user;
    return (<div className="card bg-base-300 w-96 shadow-2xl">
        <figure>
            <img
                src={photoUrl}
                alt="photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age} yrs | {gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-center my-4">
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white border-none rounded-s-full mx-2 px-8 shadow-[0_8px_16px_rgba(139,69,19,0.3)] hover:shadow-[0_4px_8px_rgba(139,69,19,0.4)] transform hover:-translate-y-1 transition-all duration-200">Ignore</button>
                <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none rounded-e-full mx-2 px-8 shadow-[0_8px_16px_rgba(219,39,119,0.3)] hover:shadow-[0_4px_8px_rgba(219,39,119,0.4)] transform hover:-translate-y-1 transition-all duration-200">Interested</button>
            </div>
        </div>
    </div>);
};

export default UserCard;