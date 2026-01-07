/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminProfile from "@/components/modules/Profile/AdminProfile";
import GuideProfile from "@/components/modules/Profile/GuideProfile";
import TouristProfile from "@/components/modules/Profile/TouristProfile";
import EmptyState from "@/components/shared/EmptyState";
import { getCurrentUser } from "@/services/auth/getProfileData";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { AlertCircle } from "lucide-react";


export default async function ProfilePage() {
  const user = await getUserInfo();
  const userFetchData = await getCurrentUser();
  const userData = userFetchData.data;

  if (!user) {
    return <EmptyState icon={AlertCircle} title="Failed to load user data." />;
  }

  if (user && (user as any).error) {
    return <EmptyState icon={AlertCircle} title={(user as any).error} />;
  }

  if (!userFetchData) {
    return <EmptyState icon={AlertCircle} title="Failed to load userData." />;
  }

  if (userFetchData && userFetchData.error) {
    return <EmptyState icon={AlertCircle} title={userFetchData.error} />;
  }

  if (user.role === "ADMIN") {
    return <AdminProfile userData={userData} />;
  }

  if (user.role === "TOURIST") {
    return <TouristProfile userData={userData} />;
  }

  if (user.role === "GUIDE") {
    return <GuideProfile userData={userData} />;
  }

  return <div>No Profile found</div>;
}
