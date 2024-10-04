/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
            remotePatterns: [
                {protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud',},
        {protocol: 'https',
            hostname: 'utfs.io',},
            {protocol: 'https',
                hostname: 'img.clerk.com',},
                {protocol: 'https',
                    hostname: 'loremflickr.com',}
        ],
          
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },  
};

export default nextConfig;
