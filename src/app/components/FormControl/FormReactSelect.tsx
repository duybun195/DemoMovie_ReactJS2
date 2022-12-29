import classnames from "classnames"
import { Control, Controller, FieldErrors, FieldValues, Path, RegisterOptions } from "react-hook-form"
import Select from "react-select"
import { FormFeedback } from "reactstrap"
import { SelectItem } from "types/common"
import { getNestedPropValue } from "utils/typeHelper"
export interface FormReactSelectProps<FieldName> {
  control: Control<FieldName>
  errors?: FieldErrors<any>
  name: Path<FieldName>
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  placeholder?: string
  options: any[]
  idField?: string
  textField?: string
  isSearchable?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  isMulti?: boolean
  onChange?: (value: any) => void
}
export const FormReactSelect = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  errors,
  options,
  idField,
  textField,
  isSearchable,
  isClearable,
  isMulti,
  isDisabled,
  onChange: onSelectChange,
  ...rest
}: FormReactSelectProps<TFieldValues>) => {
  idField = idField || "value"
  textField = textField || "label"
  const errorMessage = getNestedPropValue(errors, name)
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, ref }, fieldState: { invalid } }) => {
          const currentSelection = options.find(c => c[idField || "value"] === value) || ""
          const handleSelectChange = async (selectedOption: SelectItem | null) => {
            onChange(selectedOption?.value)
            onSelectChange && onSelectChange(selectedOption?.value)
          }
          return (
            <Select
              {...rest}
              className={classnames("my-react-select", { "is-invalid": invalid })}
              value={currentSelection}
              onChange={handleSelectChange}
              options={options}
              isSearchable={isSearchable}
              isClearable={isClearable}
              isMulti={isMulti}
              isDisabled={isDisabled}
              invalid={invalid}
            />
          )
        }}
      ></Controller>
      {errorMessage && <FormFeedback>{errorMessage.message}</FormFeedback>}
    </>
  )
}
