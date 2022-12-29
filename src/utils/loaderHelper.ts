export class LoaderHelper {
  private static isShow = false
  private static show() {
    if (!LoaderHelper.isShow && !document.body.classList.contains("active-loading")) {
      document.body.classList.add("active-loading")
      LoaderHelper.isShow = true
    }
  }
  private static hide() {
    if (LoaderHelper.isShow && document.body.classList.contains("active-loading")) {
      document.body.classList.remove("active-loading")
      LoaderHelper.isShow = false
    }
  }
  public static showHide(isShow: boolean) {
    if (isShow) this.show()
    else this.hide()
  }
}
