import { CommonSettings } from "types/common"

export class GlobalVar {
  private static _instance: GlobalVar
  private _commonSetting: CommonSettings | null = null
  private constructor() {}

  public static get instance(): GlobalVar {
    if (!GlobalVar._instance) {
      GlobalVar._instance = new GlobalVar()
    }

    return GlobalVar._instance
  }
  public setCommonSetting(commonSettings: CommonSettings) {
    const instance = GlobalVar.instance
    instance._commonSetting = commonSettings
  }
  get CommonSettings() {
    return this._commonSetting
  }
}
