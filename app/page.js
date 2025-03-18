import { redirect } from "next/navigation";
import { getUserToken } from "./userRole/getUserToken";

export default async function Page() {
  const token = await getUserToken();
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
