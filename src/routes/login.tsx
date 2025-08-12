import { Button } from "../components/common";
import { COLORS } from "../styles/var";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Button
        label="Cotiza aquí"
        color={COLORS.darkBlue2}
        onClick={() => alert("Click")}
      />

    </div>
  );
}
