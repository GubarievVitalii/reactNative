import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "../Screens/MainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/MainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/MainScreens/ProfileScreen";
import LogoutIcon from "./LogoutIcon";
import HeaderIcon from "./HeaderIcon";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="grid-outline"
              style={{ marginLeft: 70 }}
              size={24}
              color={focused ? "#FF6C00" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          ...headerOptions,
          title: "Публикации",
          headerRight: () => <LogoutIcon style={styles.iconExit} />,
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.iconAdd}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
          ),
          tabBarStyle: { display: "none" },
          ...headerOptions,
          title: "Создать публикацию",
          headerLeft: () => <HeaderIcon navigation={navigation} />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              style={{ marginRight: 70 }}
              size={24}
              color={focused ? "#FF6C00" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
export default Home;

const styles = StyleSheet.create({
  iconAdd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
  iconExit: { marginRight: 21 },
});

export const headerOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    color: "#212121",
  },
};
