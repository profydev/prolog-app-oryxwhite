/** @type {import('next').NextConfig} */
// eslint-disable-next-line
const { version } = require('./package.json');


const nextConfig = {
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
};

module.exports = nextConfig;
