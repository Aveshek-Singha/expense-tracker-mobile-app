import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/authContexts";

const StackLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="(modals)/profileModal"
                options={{
                    presentation: "modal",
                }}
            />
            <Stack.Screen
                name="(modals)/walletModal"
                options={{
                    presentation: "modal",
                }}
            />
        </Stack>
    );
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    );
}
