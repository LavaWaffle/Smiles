import { View, Text, Dimensions, Pressable, Platform } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

const feed = () => {
  const height = useBottomTabBarHeight();
  // get height of screen
  const screenHeight = Dimensions.get("screen").height;
  return (
    <View className="w-full h-full">
      <FlashList
        data={DATA}
        // snapToInterval={500}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        pagingEnabled={true}
        renderItem={({ item }) => <Card height={screenHeight - height} />}
        estimatedItemSize={2}
      />
    </View>
  );
};

export default feed;

import { Image } from "expo-image";

function Card(props: { height: number }) {
  const { height } = props;

  const isPerson: boolean = true;

  console.log(Platform.OS);

  return (
    <View
      style={{ height }}
      className="w-screen flex flex-col items-center border-2 bg-[#181A1C]"
    >
      {/* Image part */}
      <View className="aspect-[375/285] ios:aspect-[375/250]  w-screen relative">
        {/* BACKGROUND IMG */}
        <Image
          style={{ width: "100%", height: "100%" }}
          blurRadius={3}
          // className="w-full h-full object-cover"
          source={require("assets/feed/Card1.png")}
          contentFit="cover"
        />
        {/* PROFILE */}
        <View className="absolute top-[1.5rem] right-0 left-0 bottom-0 justify-center items-center">
          <Image
            style={{ width: 150, height: 150 }}
            source={require("assets/feed/Profile1.png")}
          />
        </View>
        {/* HAMBURGER MENU */}
        <View className="absolute top-12 right-3">
          <Image
            style={{ width: 25, height: 18 }}
            source={require("assets/Hamburger.svg")}
          />
        </View>
      </View>
      {/* spacer */}
      <View className="h-5" />
      {/* Name */}
      <Text
        style={{ fontFamily: "Poppins_600SemiBold" }}
        className="text-white text-[30px]"
      >
        Kat Williams
      </Text>
      {/* spacer */}
      <View className="h-[-10px]" />
      {/* Ubicaci'on */}
      <Text
        style={{ fontFamily: "Poppins_500Medium" }}
        className="text-[#727477] text-[13px] ios:text-[12px] android:mt-[-10px] mt-[-3px]"
      >
        Hopewell Valley Central HS
      </Text>
      {/* spacer */}
      <View className="h-[5px]" />
      {/* Description */}
      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-[#ECEBED] text-[13px] android:text-[14px] text-center px-6 android:px-8"
      >
        I design experiences mostly. I also sometimes travel.
      </Text>
      {/* spacer */}
      <View className="h-[15px]" />
      {/* View Profile */}
      <Pressable
        onPress={(e) => {}}
        className="bg-[#F62E8E] py-2 w-[12rem] rounded-full"
      >
        <Text
          style={{ fontFamily: "Poppins_700Bold" }}
          className="text-white text-[16px]  text-center"
        >
          View Profile
        </Text>
      </Pressable>
      {/* spacer */}
      <View className="h-[20px] android:h-[20px]" />
      {/* Bar */}
      <View className="w-[92%] h-[2px] rounded-lg bg-[#F62E8E] opacity-50" />
      {/* spacer */}
      <View className="h-[15px]" />
      {/* Highlights / Desc */}
      {isPerson ? (
        <View className="w-[80%] ml-[-1.5rem]">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-white text-[16px] text-left"
          >
            Highlights
          </Text>

          {/* spacer */}
          <View className="h-[15px]" />

          {/* Connections */}
          <View className="flex flex-row w-full  h-16">
            <View className="aspect-square grow-0 h-5 w-[4rem]">
              <Image
                source={require("assets/feed/Connection1.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            {/* spacer */}
            <View className="w-3" />
            <View className="grow w-full h-full flex r-4">
              <Text
                style={{ fontFamily: "Poppins_700Bold" }}
                className="text-white text-[15px]"
              >
                23 Mutual Connections
              </Text>
              <Text
                className="text-wrap text-[13px] pr-4 text-[#C4C4C4] opacity-50"
                style={{ fontFamily: "Poppins_400Regular" }}
              >
                You both know Luna grey, Marion Bochelli, and 21 others
              </Text>
            </View>
          </View>

          {/* spacer */}
          <View className="h-[15px]" />

          {/* interests */}
          <View className="flex flex-row w-full  h-16">
            <View className="aspect-square grow-0 h-5 w-[4rem]">
              <Image
                source={require("assets/feed/Interest1.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            {/* spacer */}
            <View className="w-3" />
            <View className="grow w-full h-full flex r-4">
              <Text
                style={{ fontFamily: "Poppins_700Bold" }}
                className="text-white text-[15px]"
              >
                Interests
              </Text>
              <Text
                className="text-wrap text-[13px] pr-4 text-[#C4C4C4] opacity-50"
                style={{ fontFamily: "Poppins_400Regular" }}
              >
                You both like Volleyball and Volunteering
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      {/* scroll for more! */}
      {Platform.OS == "android" && (
        <>
          {/* spacer */}
          <View className="h-2" />
          <View className="w-[95%] h-16 flex flex-row items-center">
            <Image
              style={{ width: 35, height: 15 }}
              source={require("assets/feed/Down.svg")}
            />
            <View className="grow bg-[#323436] rounded-[14px] mx-2">
              <Text
                style={{ fontFamily: "Roboto_700Bold" }}
                className="text-[18px] text-white py-2 text-center"
              >
                Scroll for more profiles
              </Text>
            </View>
            <Image
              style={{ width: 35, height: 15 }}
              source={require("assets/feed/Down.svg")}
            />
          </View>
        </>
      )}
    </View>
  );
}
