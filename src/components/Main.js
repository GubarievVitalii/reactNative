import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../hooks/useAuthContext";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import Home from "./Home";

const MainStack = createStackNavigator();

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <>
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Register" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <MainStack.Screen name="Home" component={Home} />
          </>
        )}
      </MainStack.Navigator>
    </AuthContext.Provider>
  );
};

export default Main;
