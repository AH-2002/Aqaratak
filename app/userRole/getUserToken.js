"use server";

import { cookies } from "next/headers";

export async function getUserToken() {
    const cookieStore = cookies();
    return cookieStore.get("userToken")?.value || null;
}
