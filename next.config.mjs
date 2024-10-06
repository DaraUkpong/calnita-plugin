/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"], // Add the Cloudinary domain here
  },
};

export default nextConfig;
