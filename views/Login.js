import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Input, Button, Text } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import useUser from "../hooks/UserApi";
import useLogin from "../hooks/LoginApi";

const Login = ({ navigation }) => {
  const { setUser, setLoggedIn } = useContext(MainContext);

  const { getUserByToken } = useUser();
  const { postLogin } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const checkToken = async () => {
    try {
      const user = await getUserByToken();
      setUser(user);
      setLoggedIn(true);
    } catch (error) {
      //console.error("checkToken()", error.message);
    }
  };

  const login = async (userCredentials) => {
    try {
      const user = await postLogin(userCredentials);
      setUser(user);
      setLoggedIn(true);
    } catch (error) {
      console.error("login():", error.message);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Card>
      <Card.Title>Login</Card.Title>

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="username"
            autoCapitalize="none"
            errorMessage={
              errors.username && <Text>This field is required.</Text>
            }
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={false}
            errorMessage={
              errors.password && <Text>This field is required.</Text>
            }
          />
        )}
        name="password"
      />

      <Button title="Login" onPress={handleSubmit(login)} />
    </Card>
  );
};

export default Login;
