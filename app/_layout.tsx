import { AuthProvider } from "@/contexts/authContexts";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const StackLayout = () => {
    return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({});
