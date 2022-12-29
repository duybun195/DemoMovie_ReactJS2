// ** React Imports
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

// ** Store & Actions
import { layoutActions } from "../../../services/layoutService"

// ** Third Party Components
import classnames from "classnames"
import { Navbar } from "reactstrap"

// ** Configs

// ** Custom Components
// import Customizer from "@components/customizer"
import FooterComponent from "./components/footer/Footer"
import NavbarComponent from "./components/navbar"
import SidebarComponent from "./components/menu/vertical-menu"

// ** Custom Hooks
// import { useNavbarType } from "@hooks/useNavbarType"
// import { useFooterType } from "@hooks/useFooterType"
// import { useNavbarColor } from "@hooks/useNavbarColor"

// ** Styles

import { useAppDispatch, useAppSelector } from "utils/hook/appHook"
import React from "react"
import { useSkin } from "utils/hook/useSkin"

const VerticalLayout = props => {
  const { handleMenuCollapsed } = layoutActions
  // ** Props
  const { children, navbar, footer, menu, routerProps, currentActiveItem } = props

  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [navbarType] = useState("navbar-floating")
  const [footerType] = useState("footer-fixed")
  const [navbarColor] = useState("white")

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // ** Store Vars
  const dispatch = useAppDispatch()
  const layoutStore = useAppSelector(state => state.layout)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  // ** Vars
  const location = useLocation()
  const menuCollapsed = layoutStore.menuCollapsed
  const isHidden = layoutStore.menuHidden

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = val => dispatch(handleMenuCollapsed(val))

  // ** Handles Content Width

  // ** Handles Content Width

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  }

  const navbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden",
  }

  const navbarClasses = {
    floating: "floating-nav",
    sticky: "fixed-top",
    static: "navbar-static-top",
    hidden: "d-none",
  }

  const bgColorCondition = navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white"

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${navbarWrapperClasses[navbarType] || "navbar-floating"} ${
          footerClasses[footerType] || "footer-static"
        }`,
        {
          // Modern Menu
          "vertical-menu-modern": windowWidth >= 1200,
          "menu-collapsed": menuCollapsed && windowWidth >= 1200,
          "menu-expanded": !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          "vertical-overlay-menu": windowWidth < 1200,
          "menu-hide": !menuVisibility && windowWidth < 1200,
          "menu-open": menuVisibility && windowWidth < 1200,
        },
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          routerProps={routerProps}
          currentActiveItem={currentActiveItem}
        />
      ) : null}

      <Navbar
        expand="lg"
        light={skin !== "dark"}
        dark={skin === "dark" || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${navbarClasses[navbarType] || "floating-nav"} navbar-shadow`,
        )}
      >
        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ setMenuVisibility, skin, setSkin })
          ) : (
            <NavbarComponent
              setMenuVisibility={() => setMenuVisibility(!menuVisibility)}
              skin={skin}
              setSkin={setSkin}
            />
          )}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames("sidenav-overlay", {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || "footer-static"}`, {
          "d-none": footerType === "hidden",
        })}
      >
        <FooterComponent />
      </footer>
    </div>
  )
}

export default VerticalLayout
