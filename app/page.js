"use client"
import { redirect } from "next/navigation";

export default async function Page() {
  const token = localStorage.getItem("userToken");
  if (token) {
    try {      
      redirect("/site/home");
    } catch (error) {
      console.error("Invalid token:", error);
      
      redirect("/auth/register");
    }
  } else {
    redirect("/auth/register");
  }

  return null; 
}
