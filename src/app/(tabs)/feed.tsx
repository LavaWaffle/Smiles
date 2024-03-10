import { View, Text, Dimensions, Pressable, Platform } from "react-native";
import React, { Fragment } from "react";
import { FlashList } from "@shopify/flash-list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const DATA = [
  {
    backgroundImg: require("assets/feed/Card1.png"),
    profileImg: require("assets/feed/Profile1.png"),
    name: "Kat Williams",
    location: "Hopewell Valley Central HS",
    description: "I design experiences mostly. I also sometimes travel.",
    isPerson: true,
    highlights: [
      {
        imageSrc: require("assets/feed/Connection1.png"),
        title: "23 Mutual Connections",
        caption: "You both know Luna grey, Marion Bochelli, and 21 others",
      },
      {
        imageSrc: require("assets/feed/Interest1.png"),
        title: "Interests",
        caption: "You both like Volleyball and Volunteering",
      },
    ],
    descriptions: [],
  },
  {
    backgroundImg: require("assets/feed/Card2.png"),
    profileImg: require("assets/feed/Profile2.png"),
    name: "Capital Health",
    location: "NJ District",
    description:
      "Want an opportunity to enter the medical field? Join our Junior internship program!",
    isPerson: false,
    highlights: [],
    descriptions: [
      "Gain hands-on healthcare experience",
      "Work with nurses and Shadow doctors",
      "Flexible part-time hours",
      "Ideal for high school students",
      "Must be aged 16 or older",
      "Unpaid",
    ],
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
        renderItem={({ item }) => (
          <Card height={screenHeight - height} {...item} />
        )}
        estimatedItemSize={2}
      />
    </View>
  );
};

export default feed;

import { Image } from "expo-image";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
const AnimatedImage = Animated.createAnimatedComponent(Image);

function Card(props: {
  height: number;
  backgroundImg: NodeRequire;
  profileImg: NodeRequire;
  name: string;
  location: string;
  description: string;
  isPerson: boolean;
  highlights: { imageSrc: NodeRequire; title: string; caption: string }[];
  descriptions: string[];
}) {
  const {
    height,
    backgroundImg,
    profileImg,
    name,
    location,
    description,
    isPerson,
    highlights,
    descriptions,
  } = props;

  // const isPerson: boolean = true;

  // console.log(Platform.OS);

  let backgroundImgStr = backgroundImg as unknown as string;
  let profileImgStr = profileImg as unknown as string;

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
          source={backgroundImgStr}
          contentFit="cover"
        />
        {/* PROFILE */}
        <Animated.View
          // sharedTransitionTag="profilePic"
          className="absolute top-[1.5rem] right-0 left-0 bottom-0 justify-center items-center"
        >
          <Animated.Image
            style={{ width: 150, height: 150 }}
            sharedTransitionTag="profilePic"
            source={profileImgStr as any}
          />
        </Animated.View>
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
      <Animated.Text
        style={{ fontFamily: "Poppins_600SemiBold" }}
        className="text-white text-[30px]"
        // sharedTransitionTag="name"
      >
        {name}
      </Animated.Text>
      {/* spacer */}
      <View className="h-[-10px]" />
      {/* Ubicaci'on */}
      <Text
        style={{ fontFamily: "Poppins_500Medium" }}
        className="text-[#727477] text-[13px] ios:text-[12px] android:mt-[-10px] mt-[-3px]"
      >
        {location}
      </Text>
      {/* spacer */}
      <View className="h-[5px]" />
      {/* Description */}
      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-[#ECEBED] text-[13px] android:text-[14px] text-center px-6 android:px-8"
      >
        {description}
      </Text>
      {/* spacer */}
      <View className="h-[15px]" />
      {/* View Profile */}
      <Pressable
        onPress={(e) => {
          console.log(name);
          if (!isPerson) {
            router.push("/shareResumate");
          } else {
            router.push("/viewProfile");
          }
        }}
        className={`${
          isPerson
            ? "bg-[#F62E8E] active:bg-[#f952a3]"
            : "bg-[#2E8AF6] active:bg-[#4b97ed]"
        }  py-2 w-[12rem] rounded-full transition-colors`}
      >
        <Text
          style={{ fontFamily: "Poppins_700Bold" }}
          className="text-white text-[16px]  text-center android:mb-[-3px]"
        >
          {isPerson ? "View Profile" : "Connect"}
        </Text>
      </Pressable>
      {/* spacer */}
      <View className="h-[20px] android:h-[20px]" />
      {/* Bar */}
      <View
        className={`w-[92%] h-[2px] rounded-lg ${
          isPerson ? "bg-[#F62E8E]" : "bg-[#2E8AF6]"
        } opacity-50"`}
      />
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

          {highlights.map((hightlight) => {
            let { imageSrc, title, caption } = hightlight;
            let imageSrcStr = imageSrc as unknown as string;
            return (
              <Fragment key={title}>
                {/* spacer */}
                <View className="h-[15px]" />

                {/* highlight */}
                <View className="flex flex-row w-full  h-16">
                  <View className="aspect-square grow-0 h-5 w-[4rem]">
                    <Image
                      source={imageSrcStr}
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
                      {title}
                    </Text>
                    <Text
                      className="text-wrap text-[13px] pr-4 text-[#C4C4C4] opacity-50"
                      style={{ fontFamily: "Poppins_400Regular" }}
                    >
                      {caption}
                    </Text>
                  </View>
                </View>
              </Fragment>
            );
          })}
        </View>
      ) : (
        <View className="w-[80%] ml-[-1.5rem]">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-white text-[16px] text-left"
          >
            Description
          </Text>

          {descriptions.map((desc) => {
            return (
              <Fragment key={desc}>
                {/* spacer */}
                <View className="h-[2px]" />
                {/* desc */}
                <Text
                  style={{ fontFamily: "Poppins_400Regular" }}
                  className="text-[#C4C4C4] text-[13px] ios:text-[11px] ml-[10px] android:ml-[8px]"
                >
                  - {desc}
                </Text>
              </Fragment>
            );
          })}
        </View>
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
