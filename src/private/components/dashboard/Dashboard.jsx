import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ProfileCompletionModel from './ProfileCompletionModel';
import Hire from './Hire';

const Dashboard = () => {
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        // If profile not complete, show the modal
        if (!user.isProfileComplete) {
            setOpenModal(true);
            return;
        }

        // If profile is complete and role is worker, redirect
        if (user.role === 'worker') {
            navigate('/qualification');
        }
    }, [user, navigate]);

    return (
        <div>
            {/* Only render Hire for hirers */}
            {user?.role === 'hirer' && <Hire />}

            {/* Profile completion prompt */}
            {openModal && (
                <ProfileCompletionModel
                    setOpenModal={setOpenModal}
                />
            )}
        </div>
    );
};

export default Dashboard;
