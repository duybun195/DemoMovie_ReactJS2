import { Control, Controller, FieldErrors, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { FormFeedback, Input, InputProps } from "reactstrap"
import { InputType } from "reactstrap/es/Input"

export interface FormInputProps<FieldName> extends Omit<InputProps, "name"> {
  control: Control<FieldName>
  errors?: FieldErrors<any>
  name: Path<FieldName>
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  placeholder?: string
  [key: string]: any
  number?: boolean
  type?: InputType
}
export const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  errors,
  placeholder,
  number,
  type,
  ...rest
}: FormInputProps<TFieldValues>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, ref }, fieldState: { invalid } }) => (
          <Input
            name={name}
            {...rest}
            type={type}
            pattern={number ? "[0-9]*" : undefined}
            placeholder={placeholder}
            value={value || ""}
            invalid={invalid}
            onChange={e => {
              onChange(e)
              if (rest.onChange) rest.onChange(e)
            }}
            ref={ref}
            checked={value === true}
          />
        )}
      ></Controller>
      {errors && errors[name] && <FormFeedback>{errors[name]?.message}</FormFeedback>}
    </>
  )
}
