import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";
import { useUserSync } from "@/hooks/useUserSync";

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    // sync Clerk user -> Supabase
    useUserSync(); 


    if (!isLoaded) return null;

    if (!isSignedIn) return <Redirect href="/sign-in" />

    return <Slot />;
}