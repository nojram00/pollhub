"use client";
import { useAuth } from "@/hooks/server/useAuth";
import { User } from "@/models/user.model";
import { Auth } from "@/utils/auth-manager";
import React, { useEffect } from "react";


const AuthContext = React.createContext<User | null>(null)

export function AuthContextProvider({ children } : {
    children : Readonly<React.ReactNode>   
}) {

    const [user, setUser] = React.useState<User | null>(null);


    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>
    );
}