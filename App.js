import { MainProvider } from "./contexts/MainContext";
import Navigator from "./navigators/Navigator";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import useFonts from "./hooks/useFonts";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const App = () => {
  const [IsReady, setIsReady] = useState(false);

  Text.defaultProps = Text.defaultProps || {};

  useEffect(() => {
    useFonts().then(() => {
      Text.defaultProps.style = { fontFamily: "karla" };
      setIsReady(true);
    });
  });

  if (!IsReady) return false;

  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;
