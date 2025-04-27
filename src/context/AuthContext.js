
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { config, displayError } from '../private/helper/config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

function transformUserData(user) {
    if (!user) return null;

    const isProfileComplete = user.role !== null;

    return {
        full_name: `${user?.first_name} ${user?.last_name}`,
        username: user?.username,
        email: user?.email,
        role: user?.role || null,
        contact_number: user?.contact_number || null,
        location: user?.location || null,
        isProfileComplete,
    };
}



const AuthProvider = ({ children }) => {

    const [authToken, setAuthTokens] = useState(null)
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const authConfig = authToken
        ? {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken.access}`,
            },
        }
        : {};

    const login = async (credintial = null) => {

        try {
            const username = credintial?.username
            const password = credintial?.password

            const response = await axios.post(config.get_token, {
                username: username,
                password: password
            });

            updateContext(response)

        } catch (error) {
            displayError("Invalid Credintial")
            console.log(error)
        }

    };

    const updateUser = async (access) => {

        try {


            const authConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                },
            };

            const response = await axios.get(config.get_user_detils, authConfig)


            const updatedData = transformUserData(response.data)

            setUser(updatedData)


        } catch (error) {
            console.log(error)
        }


    }


    const updateContext = (response) => {

        const { access, refresh } = response.data;

        setAuthTokens({ access, refresh });

        Cookies.set("authTokens", JSON.stringify({ access: access, refresh: refresh }))
        updateUser(access)

    }


    const updateToken = async () => {

        try {

            const authToken_temp = JSON.parse(Cookies.get("authTokens"))

            const { refresh } = authToken_temp

            const response = await axios.post(config.get_refresh, {
                refresh: refresh
            });

            if (response.status === 200) {
                updateContext(response)

            } else {
                logout()
            }

        } catch (error) {
            console.log(error)
            logout()
        }

    }


    const logout = () => {
        setAuthTokens(null)
        Cookies.remove("authTokens")
        navigate("/")
    };


    let data = {
        login: login,
        logout: logout,
        authToken: authToken,
        user: user,
        authConfig: authConfig,
    }


    useEffect(() => {
        updateToken();

        const interval = setInterval(() => {
            updateToken();
        }, 240000);

        return () => clearInterval(interval);
    }, []);



    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

