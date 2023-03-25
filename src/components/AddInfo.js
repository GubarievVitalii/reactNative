import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../Screens/NestedScreens/CommentsScreen";
import MapScreen from "../Screens/NestedScreens/MapScreen";
import { headerOptions } from "./Home";

const NestedScreen = createStackNavigator();

const AddInfo = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...headerOptions,
          title: "Комментарии",
          headerLeft: () => <HeaderIcon navigation={navigation} />,
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...headerOptions,
          title: "Карта",
          headerLeft: () => <HeaderIcon navigation={navigation} />,
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default AddInfo;
