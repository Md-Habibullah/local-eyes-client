// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: "**",
//       }
//     ]
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;