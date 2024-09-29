import { CheckBox, CheckBoxAll } from './CheckBox'
import { Container } from './Container'
import { ErrorMessage } from './ErrorMessage'
import { Gender } from './Gender'
import { Input, InputWithoutRegister, TextArea } from './Input'
import Stepper from './Stepper'
import { TextWithArrow } from './TextWithArrow'

export const InputGroup = Object.assign(Container, {
  Input,
  InputWithoutRegister,
  TextArea,
  Gender,
  CheckBox,
  CheckBoxAll,
  ErrorMessage,
  Stepper,
  TextWithArrow,
})
