// import MillionCompiler from "@million/lint";

import withVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // 本番環境ではconsole.logを削除する
    removeConsole: process.env.NODE_ENV === "production",
  },
  headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            // 全てのパスに Security Headers を適用する
            source: "/(.*)",
            headers: [
              {
                key: "Permissions-Policy",
                value: "camera=(), microphone=(), geolocation=()",
              },
              {
                key: "Access-Control-Allow-Origin",
                value: "same-origin",
              },
            ],
          },
        ]
      : [];
  },
};
export default withVercelToolbar()(nextConfig);
