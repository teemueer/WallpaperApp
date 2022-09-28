import { Card, Input, Button, Text } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import useRegister from "../hooks/RegisterApi";
import { Alert } from "react-native";

const Register = ({ navigation }) => {
  const { postUser, checkUsername } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const register = async (userCredentials) => {
    try {
      delete userCredentials.confirmPassword;
      console.log(userCredentials);
      const registerUser = await postUser(userCredentials);
      if (registerUser) {
        Alert.alert("Success", "Account has been created");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("register():", error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Username is required!" },
          validate: async (value) => {
            if (!(await checkUsername(value))) {
              return "Username is already taken!";
            }
            return true;
          },
          minLength: {
            value: 3,
            message: "Username has to be at least 3 characters!",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Email is required!" },
          pattern: {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: "Not an email address!",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="email"
            errorMessage={
              errors.username && <Text>This field is required!</Text>
            }
          />
        )}
        name="email"
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
            secureTextEntry={true}
            errorMessage={
              errors.username && <Text>This field is required!</Text>
            }
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This field is required!" },
          validate: (value) => {
            const { password } = getValues();
            if (value === password) {
              return true;
            } else {
              return "Passwords do not match.";
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder="re-enter password"
            autoCapitalize="none"
            errorMessage={
              errors.username && <Text>This field is required!</Text>
            }
          />
        )}
        name="confirmPassword"
      />
      <Button title={"Register"} onPress={handleSubmit(register)} />
    </Card>
  );
};

export default Register;
