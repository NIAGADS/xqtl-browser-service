import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    assetPrefix: '/xqtl-browser',
    async rewrites() {
        return [                
            {
                source: '/igvbrowser',
                destination: `${process.env.IGVBROWSER_DOMAIN}/`,
            },
            {
                source: '/:path*',
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/:path*`,
            },
            {
                source: '/service/:path*',
                destination: 'https://www.niagads.org/genomics/service/:path*'
            },           
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/:path*'
            }
        ];

    }

    /* for redirects to the GenomicsDB; e.g., record links
    async redirects() {
        return [
            {
                source: '/gene/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/gene/:path*',
                permanent: true
            },
            {
                source: '/variant/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/variant/:path*',
                permanent: true
            },
            {
                source: '/record/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/:path*',
                permanent: true
            },
        ]
        ]
    }

    */
};

export default nextConfig;
