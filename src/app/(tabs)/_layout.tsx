import { Tabs } from "expo-router";
import { View } from "react-native";

import {
  TabBarIconImage,
  TabBarIconImageEnum,
} from "components/TabBarIconImage";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", paddingTop: 5 },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIconImage
              focused={focused}
              size={size}
              color={color}
              name={TabBarIconImageEnum.Feed}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIconImage
              focused={focused}
              size={size}
              color={color}
              name={TabBarIconImageEnum.Discover}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIconImage
              focused={focused}
              size={size + 10}
              color={color}
              name={TabBarIconImageEnum.Create}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messagesNfriends"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIconImage
              focused={focused}
              size={size}
              color={color}
              name={TabBarIconImageEnum.MessagesNfriends}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="customize"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIconImage
              focused={focused}
              size={size}
              color={color}
              name={TabBarIconImageEnum.Customize}
            />
          ),
        }}
      />
    </Tabs>
  );
};
