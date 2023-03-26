import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../hooks/useAuthContext";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import Home from "./Home";
import AddInfo from "./AddInfo";

const MainStack = createStackNavigator();

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [posts, setPosts] = useState([]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, posts, setPosts }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <>
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Register" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="AddInfo" component={AddInfo} />
          </>
        )}
      </MainStack.Navigator>
    </AuthContext.Provider>
  );
};

export default Main;
