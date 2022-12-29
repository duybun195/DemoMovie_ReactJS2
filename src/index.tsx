/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

// Use consistent styling
import "sanitize.css/sanitize.css"

// Import root app
import { App } from "app/App"

import { HelmetProvider } from "react-helmet-async"

import reportWebVitals from "reportWebVitals"

// Initialize languages
import configureAppStore from "store"
import { PersistGate } from "redux-persist/integration/react"
import "./main.scss"
import { ThemeContext } from "utils/context/ThemeColors"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import FallBackSpinner from "app/components/FallbackSpinner/FallbackSpinner"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
const { persistor, store } = configureAppStore
const MOUNT_NODE = document.getElementById("root") as HTMLElement

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<FallBackSpinner />} persistor={persistor}>
      <HelmetProvider>
        <React.Fragment>
          <ThemeContext>
            <App />
            <ToastContainer />
          </ThemeContext>
        </React.Fragment>
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  MOUNT_NODE,
)

// Hot reloadable translation json files
if (module.hot) {
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
serviceWorkerRegistration.register()
