/* eslint-disable max-len */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['ipfs.io'],
  },
  webpack: (config, {isServer}) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },

  env: {
    PINATA_API_KEY: 'b334b52b019250ea2a5f',
    PINATA_API_SECRET:
      'dbc8def6c41f18dee377783af376112ab9bf6605ce14141ad84fa7c8a7a8ad5a',
    PINATA_JWT:
      ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NjdjMDU1Yy00ZGFmLTQ5MzYtOGU3NC0zNWFmNTI2MWI2ZTEiLCJlbWFpbCI6ImdpbWJlcm5hdDEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiMzM0YjUyYjAxOTI1MGVhMmE1ZiIsInNjb3BlZEtleVNlY3JldCI6ImRiYzhkZWY2YzQxZjE4ZGVlMzc3NzgzYWYzNzYxMTJhYjliZjY2MDVjZTE0MTQxYWQ4NGZhN2M4YTdhOGFkNWEiLCJpYXQiOjE2NjEyOTc0MzR9.JoDZ-w4yVB3ikj_ztvPNcOCQFiGTPWIthyW7H1KKk6U',
  },
};

module.exports = nextConfig;
