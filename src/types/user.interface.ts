import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
    id: string;
    email: string;
    role: UserRole;

    name?: string;
    profilePhoto?: string;

    // guide-specific
    isVerified?: boolean;
}
