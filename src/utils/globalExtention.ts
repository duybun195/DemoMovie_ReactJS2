/* eslint-disable no-extend-native */
import moment from "moment"
import { isNullOrEmpty, toFloat, toInt } from "./typeHelper"
export {} //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean
  type sortingValue<T> = (arg: T) => any
  type keySelector<T> = (arg: T) => any
  type resultSelector<T, TInner> = (arg: T, arg2: TInner) => any

  interface String {
    toInt: () => number
    toFloat: () => number
    isNullOrEmpty: () => boolean
  }
}

String.prototype.toInt = () => {
  return toInt(this)
}
String.prototype.toFloat = () => {
  return toFloat(this)
}
String.prototype.isNullOrEmpty = () => {
  return isNullOrEmpty(this)
}
Date.prototype.toJSON = function () {
  return moment(this).format()
}
