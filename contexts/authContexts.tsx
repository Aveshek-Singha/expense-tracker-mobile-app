import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Don't set user state immediately, wait for Firestore data
                await updateUserData(firebaseUser.uid);
                router.replace("/(tabs)");
            } else {
                setUser(null);
                router.replace("/(auth)/welcome");
            }
        });

        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            console.log("error message:", msg);
            if (msg.includes("(auth/invalid-credential)"))
                msg = "Wrong credentials";
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
            return { success: false, msg };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            let response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Create user document in Firestore
            await setDoc(doc(firestore, "users", response?.user?.uid), {
                name,
                email,
                uid: response?.user?.uid,
            });

            // Update local user state immediately with the correct data
            setUser({
                uid: response?.user?.uid,
                email: response?.user?.email,
                name: name,
                image: null,
            });

            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            console.log("error: ", error);
            if (msg.includes("(auth/email-already-in-use)"))
                msg = "This email is already in use";
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
            return { success: false, msg };
        }
    };

    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser({ ...userData });
            } else {
                // If document doesn't exist, use Firebase Auth data as fallback
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        name: currentUser.displayName,
                        image: null,
                    });
                }
                console.log(
                    "User document not found in Firestore, using auth data"
                );
            }
        } catch (error: any) {
            console.log("error: ", error);
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be wrapped inside AuthProvider");
    }
    return context;
};
