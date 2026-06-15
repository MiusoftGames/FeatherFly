const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/FeatherFly" : "",
  assetPrefix: isProd ? "/FeatherFly/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;