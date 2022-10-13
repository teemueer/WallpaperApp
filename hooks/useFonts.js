import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    karla: require("../assets/Fonts/Karla-Regular.ttf"),
    nunito: require("../assets/Fonts/Nunito-BoldItalic.ttf"),
  });
  console.log("yes");
};
