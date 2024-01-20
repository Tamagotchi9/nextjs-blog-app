/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ipy9ztohawke8ghf.public.blob.vercel-storage.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipy9ztohawke8ghf.public.vercel-storage.com',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
