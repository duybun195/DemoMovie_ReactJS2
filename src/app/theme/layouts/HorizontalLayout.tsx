// ** React Imports
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// ** Store & Actions

// ** Third Party Components
import classnames from "classnames"
import { Navbar, NavItem } from "reactstrap"

// ** Configs
import themeConfig from "../config/themeConfig"

// ** Custom Components
import NavbarComponent from "./components/navbar"
import FooterComponent from "../layouts/components/footer/Footer"
import MenuComponent from "./components/menu/horizontal-menu"

// ** Custom Hooks
import { useSkin } from "../../../utils/hook/useSkin"

// ** Styles
import "../../../assets/template/core/menu/menu-types/horizontal-menu.scss"
import { useAppSelector } from "utils/hook/appHook"

const HorizontalLayout = props => {
  // ** Props
  const { children, navbar, footer, menu, currentActiveItem, routerProps } = props
  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [navbarType] = useState("navbar-floating")
  const [footerType] = useState("footer-fixed")
  const [navbarColor] = useState("white")
  const [, setMenuVisibility] = useState(false)
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  // ** Store Vars
  const layoutStore = useAppSelector(state => state.layout)

  // ** Vars
  const isHidden = layoutStore.menuHidden

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
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
  }

  const navbarClasses = {
    floating: "floating-nav",
    sticky: "fixed-top",
  }

  const bgColorCondition = navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white"

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${navbarWrapperClasses[navbarType] || "navbar-floating"} ${
          footerClasses[footerType] || "footer-static"
        } menu-expanded`,
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      <Navbar
        expand="lg"
        className={classnames("header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center", {
          "navbar-scrolled": navbarScrolled,
        })}
      >
        {!navbar && (
          <div className="navbar-header d-xl-block d-none">
            <ul className="nav navbar-nav">
              <NavItem>
                <Link to="/" className="navbar-brand">
                  <span className="brand-logo">
                    <img src={themeConfig.app.appLogoImage} alt="logo" />
                  </span>
                  <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}

        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin })
          ) : (
            <NavbarComponent
              setMenuVisibility={() => {
                setMenuVisibility(true)
              }}
              skin={skin}
              setSkin={setSkin}
            />
          )}
        </div>
      </Navbar>
      {!isHidden ? (
        <div className="horizontal-menu-wrapper">
          <Navbar
            tag="div"
            expand="sm"
            light={skin !== "dark"}
            dark={skin === "dark" || bgColorCondition}
            className={classnames(`header-navbar navbar-horizontal navbar-shadow menu-border`, {
              [navbarClasses[navbarType]]: navbarType !== "static",
              "floating-nav": (!navbarClasses[navbarType] && navbarType !== "static") || navbarType === "floating",
            })}
          >
            {menu ? (
              menu({ routerProps, currentActiveItem })
            ) : (
              <MenuComponent routerProps={routerProps} currentActiveItem={currentActiveItem} />
            )}
          </Navbar>
        </div>
      ) : null}

      {children}

      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || "footer-static"}`, {
          "d-none": footerType === "hidden",
        })}
      >
        {footer ? footer({ footerType, footerClasses }) : <FooterComponent />}
      </footer>
    </div>
  )
}
export default HorizontalLayout
