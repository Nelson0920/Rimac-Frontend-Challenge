import { useState } from "react";
import {
  Button,
  Input,
} from "../components/common";
import "../styles/components/loginPage.scss";

export default function Login() {
  const [phone, setPhone] = useState("");

  const handleInputChange = (value: string) => {
    setPhone(value);
    console.log("Telefono:", value);
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 flex containerBackground">
        <div className={`w-1/2 h-full circleLeft`} />
        <div className={`w-1/2 h-full circleRight`} />
      </div>

      <div className="relative w-full p-4 max-w-md mx-auto">
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

        <p className="mt-4 text-white">Telefono: {phone}</p>
      </div>
    </div>
  );
}
