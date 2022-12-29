export interface UserInfo {
  role: string
  userId: number
  roleName: string
  fullName: string
  avatar: string
  warehouseID: number
  changePermission?: boolean
  permissionModules: PermissionModule[]
  warehouseIds: number[]
  roleFID: number
}
export interface LoginRequest {
  userName: string
  password: string
}
export interface LoginResponse {
  expiresIn: Date
  accessToken: string
}
export interface AuthState {
  user: UserInfo | null
  token: string | null
  currentWarehouseId?: number
  currentWarehouseName?: string
  listWarehouse?: []
}
export interface PermissionPage {
  pageID: number
  moduleID: number
  pageName: string
  router: string
  icon: string
}

export interface PermissionModule {
  moduleID: number
  moduleName: string
  router: string
  icon: string
  moduleSystem: string
  permissionPages: PermissionPage[]
}
export interface PermissionFunction {
  functionID: number
  code: string
  functionName: string
  orderBy: number
  active: boolean
}
