import accountApiRequest from "@/apiRequests/account";
import ProfileForm from "@/app/me/profile-form";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // vì dùng cookie nên api này không được cached trên server
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div>
      <div>My Profile</div>
      <ProfileForm profile={result.payload?.data} />
    </div>
  );
}
