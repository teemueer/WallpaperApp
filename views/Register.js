import { Card, Input, Button, Text } from "@rneui/base";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, View } from "react-native";
import { MainContext } from "../contexts/MainContext";
import { LinearGradient } from "expo-linear-gradient";
import useUser from "../hooks/UserApi";
import styles from "../styles/Register.style";
import Wall from "../assets/Images/wall.svg";
import useLogin from "../hooks/LoginApi";

const Register = ({ navigation }) => {
  const { postUser, checkUsername } = useUser();
  const { postLogin } = useLogin();
  const { setUser, setLoggedIn } = useContext(MainContext);

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
        //setUser(registerUser);
        //setLoggedIn(registerUser);
        await postLogin(userCredentials);
        Alert.alert("Success", "Account has been created");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("register():", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#41436A", "#984063"]} style={styles.gradient} />
      <View style={styles.imageContainer}>
        <Wall />
      </View>
      <View
        style={{
          width: "100%",
          marginBottom: "5%",
          alignItems: "center",
        }}
      >
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Username is required!" },
              validate: async (value) => {
                const usernameAvailable = await checkUsername(value);
                if (!usernameAvailable) {
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
                errorMessage={
                  (errors.username?.type === "minLength" && (
                    <Text>Min 3 chars!</Text>
                  )) ||
                  (errors.username && <Text>{errors.username.message}</Text>)
                }
              />
            )}
            name="username"
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "This field is required." },
              maxLength: { value: 254, message: "Email too long" },
              pattern: {
                value:
                  /^[a-z0-9]([a-z0-9._-]+)?@[a-z0-9][a-z0-9.-]+.[a-z]([a-z0-9]+)?[a-z]$/i,
                message: "Must be valid email.",
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
                autoCapitalize="none"
                errorMessage={
                  errors.email && <Text>{errors.email.message}</Text>
                }
              />
            )}
            name="email"
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "This field is required." },
              minLength: { value: 5, message: "Minimum 5 characters." },
              pattern: {
                value: /.*[0-9].*[\p{Lu}].*/u,
                message:
                  "Password must contain at least one number and one capital letter",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={true}
                errorMessage={
                  errors.password && <Text>{errors.password.message}</Text>
                }
              />
            )}
            name="password"
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              validate: (value) =>
                value === getValues("password")
                  ? true
                  : "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={true}
                errorMessage={
                  errors.confirmPassword && (
                    <Text>{errors.confirmPassword.message}</Text>
                  )
                }
              />
            )}
            name="confirmPassword"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
            color="#984063"
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button
            title="Register"
            onPress={handleSubmit(register)}
            color="#FE9677"
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Register;
