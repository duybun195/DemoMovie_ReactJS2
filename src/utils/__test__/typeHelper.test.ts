import {
  getDateWithBeginTime,
  getDateWithLastTime,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNestedPropValue,
  toDateSeverString,
  toDateString,
} from "utils/typeHelper"

test("Test format datestring", () => {
  const dateFormated = new Date(2021, 9, 9, 18, 56, 0)
  expect(toDateString(dateFormated)).toEqual("09/10/2021 18:56:00")
  expect(toDateSeverString(dateFormated)).toEqual("2021-10-09 18:56:00")

  expect(toDateSeverString(dateFormated)).toEqual("2021-10-09 18:56:00")
  const month = 12,
    year = 2021
  const firstDay = getFirstDayOfMonth(month, year)
  expect(firstDay).toEqual(new Date(2021, month, 1, 0, 0, 0))
  expect(getLastDayOfMonth(month, year)).toEqual(new Date(2021, month, 31, 23, 59, 59))
  expect(getNestedPropValue({ a: { b: 10 } }, "a.b")).toBe(10)
  const now = new Date()
  expect(getDateWithBeginTime(now)).toEqual(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0))
  expect(getDateWithLastTime(now)).toEqual(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59))
})
