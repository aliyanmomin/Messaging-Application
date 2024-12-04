import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const url = 'http://localhost:4000/api/auth/signup';
            const body = JSON.stringify({ fullName, username, password, confirmPassword, gender });

            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: body
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Network response was not ok: ${res.status} - Details: ${errorText}`);
            }

            const data = await res.json();
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data); // Update authUser state right after setting local storage

        } catch (error) {
            toast.error(`Failed to sign up: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill out all the fields');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }

    return true;
}
