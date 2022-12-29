// You can customize the template with the help of this file

//Template config options
export const themeConfig = {
  app: {
    appName: "Demo Xem Phim",
    appLogoImage: require("assets/images/logo/logo-demo.png").default,
  },
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    routerTransition: "fadeIn", // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: "vertical", // vertical, horizontal
    contentWidth: "full", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "floating", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "static", // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
  },
  common: {
    dateTimeFormat: "DD/M/yyyy HH:mm:ss",
    dateTimeServerFormat: "yyyy-MM-DDTHH:mm:ss",
  },
}

export default themeConfig
