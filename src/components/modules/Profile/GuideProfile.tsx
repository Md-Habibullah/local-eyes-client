/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

type GuideProfileProps = {
    userData: any;
};

export default function GuideProfile({ userData }: GuideProfileProps) {
    const { profile, averageRating, totalReviews } = userData;

    return (
        <section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Guide Profile</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="w-32 h-32 relative rounded-full overflow-hidden bg-gray-200">
                    {profile?.profilePhoto ? (
                        <Image
                            src={profile.profilePhoto}
                            alt={profile.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="flex items-center justify-center h-full w-full text-gray-500">
                            No Photo
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                    <p>
                        <span className="font-medium">Name:</span> {profile?.name || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {userData.email}
                    </p>
                    <p>
                        <span className="font-medium">Gender:</span> {profile?.gender || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Bio:</span> {profile?.bio || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Address:</span> {profile?.address || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Contact Number:</span> {profile?.contactNumber || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Languages:</span> {profile?.languages?.join(", ") || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Expertise:</span> {profile?.expertise || "-"}
                    </p>
                    <p>
                        <span className="font-medium">Daily Rate:</span> {profile?.dailyRate ? `$${profile.dailyRate}` : "-"}
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="font-medium">Rating:</span>
                        <span>{averageRating.toFixed(1)} / 5</span>
                        <span className="text-gray-500">({totalReviews} reviews)</span>
                    </p>
                    <p>
                        <span className="font-medium">Verified:</span> {profile?.isVerified ? "Yes" : "No"}
                    </p>
                    <p>
                        <span className="font-medium">Joined:</span> {new Date(profile?.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </section>
    );
}
