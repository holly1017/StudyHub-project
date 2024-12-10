import React, { createContext, useState, useContext, useEffect } from 'react';

export interface UserData {
    memberNo: number;
    memberId: string;
    nickName: string;
    profile: string;
    point: number;
    hashTag: string;
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: any;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // Get user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    let initialUser = null;

    // Try parsing the stored user data safely
    if (storedUser) {
        try {
            initialUser = JSON.parse(storedUser);
        } catch (e) {
            console.error('Failed to parse user data from sessionStorage', e);
        }
    }

    const [user, setUserState] = useState<UserData | null>(initialUser);

    // Login logic
    const setUser = (user: UserData) => {
        setUserState(user);
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    // Logout logic
    const logout = () => {
        setUserState(null);
        sessionStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
