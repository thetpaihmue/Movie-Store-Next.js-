/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
