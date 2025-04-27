import { useUser } from "@stackframe/stack";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function AuthProvider({ children }) {
    const user = useUser();
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        if (user) {
            storeUser({
                name: user.displayName || "",
                email: user.primaryEmail || "",
                // Removed stackUserId and image
            }).catch(console.error);
        }
    }, [user, storeUser]);

    return children;
}

export default AuthProvider;
