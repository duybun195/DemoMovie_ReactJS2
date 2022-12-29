import Select from "react-select"
export interface ReactSelectAction<TOption> {
  action: string
  name: string | undefined
  option?: TOption
  removedValue?: TOption
}
export interface ReactSelectProps<TOption> {
  placeholder?: string
  options: TOption[]
  idField?: string | keyof TOption | ((item: TOption) => string)
  textField?: string | keyof TOption | ((item: TOption) => string)
  isSearchable?: boolean
  isClearable?: boolean
  isMulti?: boolean
  defaultValue?: TOption | TOption[]
  menuIsOpen?: boolean
  onChange?: (value: TOption | TOption[], action?: ReactSelectAction<TOption>) => void
  rest?: [string]
}
export const ReactSelect = <TOption extends object>({
  defaultValue,
  options,
  idField,
  textField,
  isSearchable,
  isClearable,
  isMulti,
  onChange,
  menuIsOpen,
  ...rest
}: ReactSelectProps<TOption>) => {
  return (
    <Select
      {...rest}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      idField={idField}
      textField={textField}
    />
  )
}
