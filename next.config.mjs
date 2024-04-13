/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "https://www.google.com" },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "X-Requested-With, Content-Type, Authorization",
        },
        { key: "Access-Control-Allow-Credentials", value: "true" },
      ],
    },
  ],
};

export default nextConfig;
