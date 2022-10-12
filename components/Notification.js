import {Alert} from "react-native";

const Notification = ({message, color}) => {
  Alert.alert("", message, [text: "OK"]);
}

export default Notification;