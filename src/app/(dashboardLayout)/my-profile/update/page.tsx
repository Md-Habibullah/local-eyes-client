
import EditProfileForm from "@/components/modules/auth/EditProfileForm";
import { getCurrentUser } from "@/services/auth/getProfileData";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
    try {
        console.log("Fetching current user...");
        const response = await getCurrentUser();

        console.log("Raw response:", response);

        // Debug: Log the response structure
        console.log("Response keys:", Object.keys(response));

        // If response has error property
        if ('error' in response) {
            console.error("Server action error:", response.error);
            redirect("/login");
        }

        // Try different response structures
        let userData;

        // Structure 1: response.data
        if (response.data) {
            console.log("Found user data in response.data:", response.data);
            userData = response.data;
        }
        // Structure 2: response directly is the user
        else if (response.id) {
            console.log("Response is user data directly:", response);
            userData = response;
        }
        // Structure 3: response.user
        else if (response.user) {
            console.log("Found user data in response.user:", response.user);
            userData = response.user;
        }
        else {
            console.error("Unknown response structure:", response);
            redirect("/login");
        }

        console.log("User data for form:", userData);

        // Format the data for the form
        const profileData = {
            id: userData.id || "",
            email: userData.email || "",
            role: userData.role || "",
            profile: {
                name: userData.name || userData.profile?.name || "",
                gender: userData.gender || userData.profile?.gender || "",
                profilePhoto: userData.profilePhoto || userData.profile?.profilePhoto || "",
                bio: userData.bio || userData.profile?.bio || "",
                address: userData.address || userData.profile?.address || "",
                contactNumber: userData.contactNumber || userData.profile?.contactNumber || "",
                languages: userData.languages || userData.profile?.languages || [],
                preferences: userData.preferences || userData.profile?.preferences || [],
                expertise: userData.expertise || userData.profile?.expertise || [],
                dailyRate: userData.dailyRate || userData.profile?.dailyRate || 0,
            }
        };

        console.log("Formatted profile data:", profileData);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30 p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    <EditProfileForm initialData={profileData} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading user profile:", error);
        redirect("/my-profile");
    }
};

export default EditProfilePage;