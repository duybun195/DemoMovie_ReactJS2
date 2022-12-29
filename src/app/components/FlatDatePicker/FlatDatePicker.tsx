import classNames from "classnames"
import Flatpickr from "react-flatpickr"
export interface FlatDatePickerProps {
  onChange: (value?: Date | null) => void
  value?: Date
  options?: any
  placeholder?: string
}
export const FlatDatePicker = ({ placeholder, onChange, value, options, ...rest }: FlatDatePickerProps) => {
  let setOptions = options || { mode: "single" }
  setOptions.altInput = true
  setOptions.altFormat = "d/m/Y"
  setOptions.conjunction = " đến "
  return (
    <Flatpickr
      value={value}
      placeholder={placeholder}
      className={classNames("form-control")}
      onChange={date => {
        if (!date || date.length === 0) onChange(null)
        else if (date.length === 1) onChange(date[0])
        else onChange(date)
      }}
      options={setOptions}
      {...rest}
    />
  )
}
