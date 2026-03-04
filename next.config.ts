import type { NextConfig } from "next";
import path from "node:path";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubPages && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isGitHubPages ? "true" : "false",
  },
  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      { protocol: "https", hostname: "pixabay.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
  webpack(config) {
    if (isGitHubPages) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        "@/lib/auth": path.resolve(process.cwd(), "src/lib/auth.static.ts"),
        "@/lib/db": path.resolve(process.cwd(), "src/lib/db.static.ts"),
      };
    }

    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (s: string) => boolean } }) =>
        rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/] },
          use: ["@svgr/webpack"],
        }
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
