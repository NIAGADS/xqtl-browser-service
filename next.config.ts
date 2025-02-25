import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    assetPrefix: '/xqtl-browser',
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/collection",
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/`,
            },
            {
                source: "/track/:path+",
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/track/:path+`,
            },
            {
                source: "/track-collection-static/_next/:path+",
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/track-collection-static/_next/:path+`,
            },

            {
                source: '/igvbrowser',
                destination: `${process.env.IGVBROWSER_DOMAIN}/`,
            },
            
            {
                source: "/igvbrowser-static/_next/:path+",
                destination: `${process.env.IGVBROWSER_DOMAIN}/igvbrowser-static/_next/:path+`,
            },


            {
                source: '/service/:path*',
                destination: 'https://www.niagads.org/genomics/service/:path*'
            },

            {
                source: '/api/:path*',
                destination: 'https://api.niagads.org/:path*'
            },
            
            {
                source: '/files/:path*',
                destination: 'https://www.niagads.org/genomics/files/:path*'
            },
        ];

    },

    //for redirects to the GenomicsDB; e.g., record links
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

    }

    
};

export default nextConfig;
