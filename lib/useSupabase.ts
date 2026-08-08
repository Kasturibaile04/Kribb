import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createClerkSupabaseClient } from "../lib/supabase";

export function useSupabase() {
    const { getToken } = useAuth();

    const client = useMemo(
        () =>
            createClerkSupabaseClient(
                // Supabase Third Party Auth: accepts Clerk JWT directly (no template needed)
                () => getToken()
            ),
        [getToken]
    );

    return client;
}