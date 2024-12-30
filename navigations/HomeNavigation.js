import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";
import PostDetails from "../screens/PostDetails";
import AddComment from "../screens/AddComment";

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="PostDetail" component={PostDetails} />
      <Stack.Screen name="Comment" component={AddComment} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
