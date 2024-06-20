/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'], // Need to whitelist the image domain
  },
};

export default nextConfig;
