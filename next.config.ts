import "./src/env";
import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default withContentCollections(nextConfig);
