import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { getIsAuth } from "../redux/auth/authSelectors";

import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import Home from "./Home";
import AddInfo from "./AddInfo";

const MainStack = createStackNavigator();

const Main = () => {
  const isAuth = useSelector(getIsAuth);

  return (
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
  );
};

export default Main;
