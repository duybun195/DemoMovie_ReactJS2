// ** React Imports
import React, { Fragment } from "react"
import { SkinType } from "services/layoutService"

// ** Custom Components
import NavbarUser from "./NavbarUser"
export type ThemeNavbarProps = {
  skin: SkinType | ((value: any) => void)
  setSkin: (type: SkinType) => void
  setMenuVisibility: () => void
}
const ThemeNavbar = ({ skin, setSkin, setMenuVisibility }: ThemeNavbarProps) => {
  // ** Props

  return (
    <Fragment>
      <NavbarUser skin={skin} setSkin={setSkin} setMenuVisibility={setMenuVisibility} />
    </Fragment>
  )
}

export default ThemeNavbar
