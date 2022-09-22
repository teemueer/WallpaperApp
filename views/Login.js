import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Button } from "@rneui/base";

const Login = ({ navigation }) => {
  const { setLoggedIn } = useContext(MainContext);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <Button title="Login" onPress={() => login()} />
    </Card>
  );
};

export default Login;
