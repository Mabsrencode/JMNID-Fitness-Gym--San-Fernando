import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ClientHeader = () => {
    const [user, setUser] = useState(null);
    const [profileName, setProfileName] = useState(null);
    const firstName = user?.firstName?.split('')[0];
    const lastName = user?.lastName?.split('')[0];
    // TODO: call userProvider instead of using useEffect on auth
    useEffect(() => {
        const randomColor = () => {
            const r = Math.floor(Math.random() * 255).toString();
            const g = Math.floor(Math.random() * 255).toString();
            const b = Math.floor(Math.random() * 255).toString();
            const profile = document.getElementById('profile');
            profile.style.backgroundColor = 'rgb(' + [r, g, b].join(',') + ')';
        }
        randomColor()
    }, [])
    useEffect(() => {
        const combinedProfile = () => {
            setProfileName(`${firstName} ${lastName}`);
        }
        combinedProfile()
    }, [firstName, lastName]);
    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post("/auth", {}, { withCredentials: true });
            setUser(data);
        };
        verifyCookie();
    }, []);
    return (
        <header className='w-full bg-bg-color border-b border-gray-light py-3 px-6 top-0 right-0 z-0 flex justify-end'>
            <div className=''>
                {user?.profile ? <img src={user?.profile} alt="profile" /> : <div id='profile' className='rounded-full font-teko font-semibold w-[40px] h-[40px] grid justify-center items-center'>{profileName}</div>}
            </div>
        </header>
    )
}

export default ClientHeader