/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1303543-4742835.cloudwaysapps.com"
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com"
      }
    ]
  }
};

export default nextConfig;
