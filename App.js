import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./src/assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./src/assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./src/assets/fonts/Roboto-Bold.ttf";

import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": RobotoRegular,
    "Roboto-Medium": RobotoMedium,
    "Roboto-Bold": RobotoBold,
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      {/* <LoginScreen /> */}
      <RegistrationScreen />
    </>
  );
};

export default App;
