import { useUser } from "@clerk/expo";
import { useEffect } from "react";
import { useSupabase } from "../lib/useSupabase";
import { useUserStore } from "../store/userStore";

export const useUserSync = () => {
    const { user } = useUser();
    const setIsAdmin = useUserStore((state) => state.setIsAdmin);

    const authSupabase = useSupabase();

    useEffect(() => {
        if (!user) return;
        syncUser();
    }, [user]);

    const syncUser = async () => {
        if (!user) return;

        // Check if user already exists in Supabase
        const { data, error: selectError } = await authSupabase
            .from("users")
            .select("clerk_id,is_admin")
            .eq("clerk_id", user.id)
            .maybeSingle();

        if (selectError) {
            console.error("❌ Supabase select error:", selectError.message);
            return;
        }

        if (data) {
            // user exists - just sync isAdmin to Zustand
            setIsAdmin(data.is_admin ?? false);
            return;
        }

        // User doesn't exist — insert them
        const { data: newUser, error: insertError } = await authSupabase
            .from("users")
            .insert({
                clerk_id: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                first_name: user.firstName,
                last_name: user.lastName,
                avatar_url: user.imageUrl,
            })
            .select("is_admin")
            .single();

        if (insertError) {
            console.error("❌ Supabase insert error:", insertError.message);
            return;
        }

        console.log("✅ New user added to Supabase:", user.id);
        setIsAdmin(newUser?.is_admin ?? false);
    };
};