import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Input, Button, Text, Image } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import useUser from "../hooks/UserApi";
import useLogin from "../hooks/LoginApi";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/Login.style";
import Wall from "../assets/Images/wall.svg";

const Login = ({ navigation }) => {
  const { setUser, setLoggedIn, update, setUpdate } = useContext(MainContext);
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
      setUpdate(!update);
      navigation.navigate("Home");
    } catch (error) {
      //console.error("checkToken()", error.message);
    }
  };

  const login = async (userCredentials) => {
    try {
      const user = await postLogin(userCredentials);
      console.log(user);
      setUser(user.user);
      setLoggedIn(true);
      setUpdate(!update);
      navigation.navigate("Home");
    } catch (error) {
      console.error("login():", error.message);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#41436A", "#984063"]} style={styles.gradient} />
      <View style={styles.imageContainer}>
        <Wall></Wall>
      </View>
      <View
        style={{
          width: "100%",
          marginBottom: "15%",
          alignItems: "center",
        }}
      >
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{}}
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
        </View>

        <View style={styles.input}>
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
                  errors.password && <Text>This field is required.</Text>
                }
              />
            )}
            name="password"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Login"
            onPress={handleSubmit(login)}
            color="#984063"
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
            color="#FE9677"
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
