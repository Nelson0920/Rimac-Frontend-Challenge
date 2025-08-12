import { useState } from "react"
import {
  Button,
  Input,
} from "../components/common"

export default function Login() {
  const [phone, setPhone] = useState("")

  const handleInputChange = (value: string) => {
    setPhone(value)
    console.log("Telefono:", value)
  }

  return (
    <div className="w-full p-4">
      <h1>Login</h1>
      <Button label="Cotiza aquí" onClick={() => alert('Click')} />
      
      <Input
        type="tel"
        placeholder="Celular"
        value={phone}
        onChange={handleInputChange}
      >
        <Input.Label />
        <Input.Field pattern="[0-9]{7,12}" />
      </Input>

      <p>Telefono: {phone}</p>
    </div>
  );
}
