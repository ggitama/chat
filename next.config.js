const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  poweredByHeader: false,
  images: {
    domains: [
      "blog.antavaya.com",
      "images.mgbedbank.com",
      "storage.googleapis.com",
      "cdn.antavaya.com",
      "pwa.antavaya.com",
      "api-prod.antavaya.com",
      "dev.antavaya.com",
      "pwauat.antavaya.com",
      "uat-jarvis.mgbedbank.com",
      "uaticpmms.ctcorpmpc.com",
    ],
    deviceSizes: [640, 750, 828, 1024, 1280, 1366, 1536, 1600, 1920, 2048],
  },
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "strict-transport-security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
});
