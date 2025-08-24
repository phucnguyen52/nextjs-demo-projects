import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div>
      <div>My Profile</div>
      <div>Xin chào {result.payload?.data?.name}</div>
      <Profile />
    </div>
  );
}
