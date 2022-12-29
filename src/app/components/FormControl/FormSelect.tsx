import { Control, Controller, FieldErrors, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { FormFeedback, Input, InputProps } from "reactstrap"
import { toSelectList } from "utils/transformHelper"
import { toInt } from "utils/typeHelper"

export interface FormInputProps<FieldName, TOption> extends Omit<InputProps, "name"> {
  control: Control<FieldName>
  errors?: FieldErrors<any>
  name: Path<FieldName>
  nameString?: string
  [key: string]: any
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  placeholder?: string
  options?: Array<TOption>
  idField: keyof TOption | ((value: TOption) => any)
  textField: keyof TOption | ((value: TOption) => any)
  onValueChange?: (value: any) => void
}
export const FormSelect = <TFieldValues extends FieldValues = FieldValues, TOption extends any = any>({
  control,
  name,
  nameString,
  rules,
  errors,
  placeholder,
  options,
  idField,
  textField,
  typesValueSelect,
  onValueChange,
  ...rest
}: FormInputProps<TFieldValues, TOption>) => {
  const selectList = toSelectList(options, idField, textField)
  if (rules && rules.required) {
    rules.validate = (id: number | string) => {
      return toInt(id) !== 0 || rules.required?.toString()
    }
  }
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, ref }, fieldState: { invalid } }) => {
          return (
            <Input
              type="select"
              name={name}
              {...rest}
              placeholder={placeholder}
              value={value || ""}
              invalid={invalid}
              onChange={e => {
                onChange(e)
                onValueChange && onValueChange(e.target.value)
              }}
              ref={ref}
            >
              <option value={typesValueSelect === "number" ? "0" : ""}>{placeholder}</option>
              {selectList &&
                selectList.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  )
                })}
            </Input>
          )
        }}
      ></Controller>
      {errors && errors[name] && <FormFeedback>{errors[name].message}</FormFeedback>}
    </>
  )
}
