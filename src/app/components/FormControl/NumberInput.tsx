import { Input } from "reactstrap"

export const NumberInput = props => {
  return <Input {...props} type="number" partern="[0-9.]*" />
}
