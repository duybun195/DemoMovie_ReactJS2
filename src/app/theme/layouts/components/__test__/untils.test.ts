import navigation from "../../navigation"
import { searchParentsNavLink } from "../../utils"

test("Test format datestring", () => {
  const parent = searchParentsNavLink(navigation, "/nhap-kho-tp-btp/tao-moi")
  expect(parent?.navLink).toEqual("/nhap-kho-tp-btp/danh-sach")
})
test("Test format chinh sua", () => {
  const parent = searchParentsNavLink(navigation, "/nhap-kho-tp-btp/chinh-sua/3")
  expect(parent?.navLink).toEqual("/nhap-kho-tp-btp/danh-sach")
})
