// ** React Imports
import { useEffect, useState } from "react"

// ** Custom Components
import Avatar from "../../../components/avatar"

// ** Utils

// ** Store & Actions
import { logout } from "../../../../../services/authService"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { Lock, Power } from "react-feather"

// ** Default Avatar Image
import { useAppDispatch } from "utils/hook/appHook"
import { useCurrentUser } from "utils/hook/useAuth"
import { UserInfo } from "types/auth"

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useAppDispatch()
  const currentUser = useCurrentUser()
  // ** State
  const [userData, setUserData] = useState<UserInfo>()

  //** ComponentDidMount
  useEffect(() => {
    if (currentUser !== null) {
      setUserData(currentUser)
    }
  }, [currentUser])
  const handleLogOut = () => {
    dispatch(logout())
  }
  //** Vars
  //const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={e => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">{(userData && userData.fullName) || "John Doe"}</span>
          <span className="user-status">{(userData && userData.roleName) || "Developer"}</span>
        </div>
        <Avatar content={userData?.fullName} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem tag={Link} to="#" onClick={e => e.preventDefault()}>
          <User size={14} className="mr-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={e => e.preventDefault()}>
          <Mail size={14} className="mr-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={e => e.preventDefault()}>
          <CheckSquare size={14} className="mr-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className="mr-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem> */}
        <DropdownItem tag="a" onClick={() => {}}>
          <Lock size={14} className="mr-75" />
          <span className="align-middle">Đổi mật khẩu</span>
        </DropdownItem>
        <DropdownItem tag="a" onClick={handleLogOut}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">Thoát</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
