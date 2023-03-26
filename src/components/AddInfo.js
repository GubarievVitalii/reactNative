import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../Screens/NestedScreens/CommentsScreen";
import MapScreen from "../Screens/NestedScreens/MapScreen";
import HeaderIcon from "./HeaderIcon";
import { headerOptions } from "./Home";

const NestedScreen = createStackNavigator();

const AddInfo = ({ navigation }) => {
  const route = useRoute();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...headerOptions,
          title: "Комментарии",
          headerLeft: () => (
            <HeaderIcon
              navigation={navigation}
              path={route.params.params.back}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...headerOptions,
          title: "Карта",
          headerLeft: () => (
            <HeaderIcon
              navigation={navigation}
              path={route.params.params.back}
            />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default AddInfo;
