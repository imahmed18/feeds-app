// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons icons

import FeedScreen from "../../screens/Feed";
import CreatePostScreen from "../../screens/CreatePost";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline"; // Use Ionicons icons
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 14, // Font size of the tab labels
          fontWeight: "700", // Font weight of the tab labels
          marginTop: 5, // Margin top of the tab labels
          fontFamily: "titlefont"
        },
        tabBarActiveTintColor: "black", // Color of focused tab
        tabBarInactiveTintColor: "gray", // Color of inactive tabs
        tabBarStyle: {
          backgroundColor: "white", // Background color of the tab bar
          borderTopWidth: 1, // Top border width
          borderTopColor: "rgba(0,0,0,0.1)", // Top border color
          height: 60, // Increase the height of the tab bar
          paddingTop: 10
        },
        headerTitleStyle: {
          fontSize: 22, // Font size of the header title
          fontWeight: "bold", // Font weight of the header title
          color: "black", // Color of the header title
          fontFamily: "titlefont",
          fontWeight: 500
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerTitle: "Feed" }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{ headerTitle: "Create Post" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
