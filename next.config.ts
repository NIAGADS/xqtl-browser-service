import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    assetPrefix: '/xqtl-browser',
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: `/${process.env.PORTAL_PATH}`,
    async rewrites() {
        return [
            {
                source: `/${process.env.PORTAL_PATH}/collection`,
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/`,
                basePath: false
            },
            {
                source: `/${process.env.PORTAL_PATH}/track/:path+`,
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/track/:path+`,
                basePath: false
            },
            {
                source: `/track-collection-static/_next/:path+`,
                destination: `${process.env.TRACK_COLLECTION_DOMAIN}/track-collection-static/_next/:path+`,
                basePath: false
            },

            {
                source: `/${process.env.PORTAL_PATH}/igvbrowser`,
                destination: `${process.env.IGVBROWSER_DOMAIN}/`,
                basePath: false
            },
            
            {
                source: "/igvbrowser-static/_next/:path+",
                destination: `${process.env.IGVBROWSER_DOMAIN}/igvbrowser-static/_next/:path+`,
                basePath: false
            },


            {
                source: '/service/:path*',
                destination: 'https://www.niagads.org/genomics/service/:path*',
                basePath: false
            },

            {
                source: '/api/:path*',
                destination: 'https://api.niagads.org/:path*',
                basePath: false
            },
            
            {
                source: '/files/:path*',
                destination: 'https://www.niagads.org/genomics/files/:path*',
                basePath: false
            },
        ];

    },

    //for redirects to the GenomicsDB; e.g., record links
    async redirects() {
        return [
            {
                source: '/gene/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/gene/:path*',
                permanent: true,
                basePath: false
            },
            {
                source: '/variant/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/variant/:path*',
                permanent: true,
                basePath: false,
            },
            {
                source: '/record/:path*',
                destination: 'https://www.niagads.org/genomics/app/record/:path*',
                permanent: true,
                basePath: false
            },
        ]

    }

    
};

export default nextConfig;
