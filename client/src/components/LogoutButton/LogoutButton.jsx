import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";
const LogoutButton = () => {
    const navigate = useNavigate();
    const [, removeCookie] = useCookies(["jmnid-tk"]);

    const handleLogout = async () => {
        try {
            const response = await axios.get("/auth/logout", { withCredentials: true });


            if (response.status === 200) {
                localStorage.clear();
                removeCookie("jmnid-tk", { path: "/" });
                navigate("/");
                window.location.reload();
            } else {
                console.error("Error logging out:", response.data.message);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button
            className="bg-primary text-black hover:text-black  rounded-full p-2 hover:bg-primary-light transition-all"
            onClick={handleLogout}
        >
            {/* <i className="fa-solid fa-right-from-bracket" title="Log Out"></i> */}
            <AiOutlineLogout className="text-[20px]" title="Log Out" />
        </button>
    );
};

export default LogoutButton;
