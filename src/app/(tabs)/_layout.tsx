import { Tabs } from "expo-router";
import { View } from "react-native";

import {
  TabBarIconImage,
  TabBarIconImageEnum,
} from "components/TabBarIconImage";
import { useState } from "react";

export default () => {
  const [prevState, setPrevState] = useState<number>(0);
  return (
    <Tabs
      screenListeners={{
        state: (e: any) => {
          const newTabIndex = e.data.state.index;
          setPrevState(newTabIndex);
        },
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          paddingTop: 5,
          borderWidth: 0,
          margin: 0,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "#181A1C",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
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
