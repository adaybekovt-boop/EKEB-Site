/** @type {import('next').NextConfig} */
export default {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  trailingSlash: true,
};
