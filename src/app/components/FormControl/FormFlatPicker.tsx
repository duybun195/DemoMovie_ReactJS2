import { Control, Controller, FieldErrors, Path, RegisterOptions, FieldValues } from "react-hook-form"
import Flatpickr from "react-flatpickr"
import { FormFeedback } from "reactstrap"
import classNames from "classnames"
export interface FormFlatPickerProps<FieldName> {
  control: Control<FieldName>
  errors?: FieldErrors<any>
  name: Path<FieldName>
  [key: string]: any
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  placeholder?: string
  options?: any
  isReadOnly?: boolean
}
export const FormFlatPicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  errors,
  placeholder,
  options,
  isReadOnly,
  ...rest
}: FormFlatPickerProps<TFieldValues>) => {
  let setOptions = options || { mode: "single" }
  setOptions.altInput = true
  setOptions.altFormat = "d/m/Y"
  setOptions.conjunction = " đến "

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, ref }, fieldState: { invalid } }) => {
          return (
            <Flatpickr
              disabled={isReadOnly}
              value={value}
              placeholder={placeholder}
              className={classNames("form-control", { "date-required": invalid })}
              onChange={date => {
                if (!date || date.length === 0) onChange(null)
                else if (date.length === 1) onChange(date[0])
                else onChange(date)
              }}
              options={setOptions}
              {...rest}
            />
          )
        }}
      ></Controller>
      {errors && errors[name] && <FormFeedback>{errors[name].message}</FormFeedback>}
    </>
  )
}
