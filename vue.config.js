module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "Frame Designer",
    themeColor: "#0D4FC1",
    msTileColor: "#0D4FC1",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      icons: [
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
};
