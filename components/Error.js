import { Alert } from "react-native";

const Error = (message) => {
  Alert.alert("Error", message, [
    {
      text: "OK",
    },
  ]);
};

export default Error;
