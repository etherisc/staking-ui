/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  headers: async function() {
    return [
        {
            // matching all API routes
            source: "/",
            headers: [
                // { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "http://localhost:3100,https://staking.etherisc.com" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
}
}

module.exports = nextConfig
