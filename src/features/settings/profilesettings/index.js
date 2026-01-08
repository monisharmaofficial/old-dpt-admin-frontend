import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import config from '../../../config'

function ProfileSettings() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');



    useEffect(() => {
        const token = localStorage.getItem("token");
      
    
        axios.get(`${config.baseUrl}/welcome`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const userData = response.data.data;
          
            setName(userData.name);
            setEmail(userData.email);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);
    

    return (
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Name</span>
                    </label>
                    <p>{name}</p>
                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Email Id</span>
                    </label>
                    <p>{email}</p>
                    
                </div>
               

            </TitleCard>
        </>
    );
}

export default ProfileSettings;
