"use client"
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { UserContext } from "./_Context/UserContext";

function AuthProvider({ children }) {
    const user = useUser();
    const storeUser = useMutation(api.users.store);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            storeUser({
                name: user.displayName || "",
                email: user.primaryEmail || "",
            }).catch(console.error);
        }
        setUserData(user);
    }, [user, storeUser]);

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}

export default AuthProvider;
