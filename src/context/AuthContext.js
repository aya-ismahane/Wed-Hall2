import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // 'client' or 'owner'
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch(`${API_BASE}/auth/getCurrentUser.php`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.status === "success") {
                setUser(data.user);
                setRole(data.role);
            } else {
                setUser(null);
                setRole(null);
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            setUser(null);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(`${API_BASE}/redaWork/login.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.status === "success") {
            setUser(data.user);
            setRole(data.role);
            return { success: true, role: data.role };
        }
        return { success: false, error: data.error };
    };

    const logout = async () => {
        try {
            await fetch(`${API_BASE}/auth/logout.php`, {
                credentials: 'include'
            });
        } catch (err) {
            console.warn("Logout request failed (clearing session locally):", err?.message || err);
        }
        setUser(null);
        setRole(null);
    };

    const registerClient = async (formData) => {
        const res = await fetch(`${API_BASE}/auth/signup_client.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    };

    const registerOwner = async (formData) => {
        const res = await fetch(`${API_BASE}/auth/signup_owner.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                loading,
                login,
                logout,
                registerClient,
                registerOwner,
                refreshUser,
                API_BASE,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
