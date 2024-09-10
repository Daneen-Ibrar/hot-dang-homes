const withTranspileModules = require('next-transpile-modules')(['gsap']);

module.exports = withTranspileModules({
  reactStrictMode: true,
  images: {
    domains: ['hot-dang-homes-course.local'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { net: false, tls: false, fs: false, child_process: false };
    }
    return config;
  },
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/my-account': { page: '/my-account' },
      '/selling/sell-your-property': { page: '/selling/sell-your-property' },
      '/selling/guide-to-selling': { page: '/selling/guide-to-selling' },
      '/buying/guide-to-buying': { page: '/buying/guide-to-buying' }
    };
  },
});
