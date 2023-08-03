/** @type {import('next').NextConfig.rewrites} */
const rewrites = async () => {
    return [{
        source: '/api/v1/:path*',
        destination: 'https://kaiwu-workbench.intern.yuansuan.cn//api/v1/:path*',
    }]
}
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites
}

module.exports = nextConfig
