/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for optimized Docker image (~150MB vs ~1GB)
  output: "standalone",

  // Allow Next.js to proxy to FastAPI internally
  async rewrites() {
    return [
      {
        source: "/api/ml/:path*",
        destination: `${process.env.FASTAPI_INTERNAL_URL}/api/:path*`,
      },
    ];
  },

  // S3 presigned URL image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
      //{
        //protocol: "https",
        //hostname: "*.s3.us-east-1.amazonaws.com",
        //pathname: "/**",
      //},
    ],
  },
};

export default nextConfig;*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;