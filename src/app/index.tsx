import { Link, Stack } from "expo-router";
import { View, Text, SafeAreaView, Dimensions, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

export default function () {
  const [page, setPage] = useState(0);
  const ScreenWidth = Dimensions.get("screen").width;
  const page1TranslateX = useSharedValue(0);
  const [page1Hidden, setPage1Hidden] = useState(false);
  const page2TranslateX = useSharedValue(ScreenWidth);
  const [page2Hidden, setPage2Hidden] = useState(true);
  const page3TranslateX = useSharedValue(ScreenWidth);
  const [page3Hidden, setPage3Hidden] = useState(true);
  const page4TranslateX = useSharedValue(ScreenWidth);
  const [page4Hidden, setPage4Hidden] = useState(true);

  const pages: PageProps[] = [
    {
      pageTranslateX: page1TranslateX,
      Text1: "Welcome",
      hidden: page1Hidden,
      Text2: "Get ready to share your academic and extracurricular life!",
      MYIMAGE: () => (
        <Image
          source={require("assets/tutorial/1.png")}
          style={{ width: 282, height: 271 }}
        />
      ),
    },
    {
      pageTranslateX: page2TranslateX,
      hidden: page2Hidden,
      Text1: "Network",
      Text2:
        "Browse profiles, follow, and message those who share your interests and goals.",
      MYIMAGE: () => (
        <Image
          source={require("assets/tutorial/2.png")}
          style={{ width: 310, height: 269 }}
        />
      ),
    },
    {
      pageTranslateX: page3TranslateX,
      hidden: page3Hidden,
      Text1: "Explore",
      Text2:
        "Discover job and volunteering opportunities posted by companies and organizations.",
      MYIMAGE: () => (
        <Image
          source={require("assets/tutorial/3.png")}
          style={{ width: 264, height: 257 }}
        />
      ),
    },
    {
      pageTranslateX: page4TranslateX,
      hidden: page4Hidden,
      Text1: "Smile!",
      Text2: "Take photos of your projects, awards, and activities.",
      MYIMAGE: () => (
        <Image
          source={require("assets/tutorial/4.png")}
          style={{ width: 343, height: 240 }}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log("page", page);
    switch (page) {
      case 0: {
        page1TranslateX.value = withTiming(0);
        setPage1Hidden(false);
        page2TranslateX.value = withTiming(ScreenWidth);
        setPage2Hidden(true);
        page3TranslateX.value = withTiming(ScreenWidth);
        setPage3Hidden(true);
        page4TranslateX.value = withTiming(ScreenWidth);
        setPage4Hidden(true);
        break;
      }
      case 1: {
        page1TranslateX.value = withTiming(-ScreenWidth);
        setPage1Hidden(true);
        page2TranslateX.value = withTiming(0);
        setPage2Hidden(false);
        page3TranslateX.value = withTiming(ScreenWidth);
        setPage3Hidden(true);
        page4TranslateX.value = withTiming(ScreenWidth);
        setPage4Hidden(true);

        setTimeout(() => {}, 200);

        break;
      }
      case 2: {
        page1TranslateX.value = withTiming(-ScreenWidth);
        setPage1Hidden(true);
        page2TranslateX.value = withTiming(-ScreenWidth);
        setPage2Hidden(true);
        page3TranslateX.value = withTiming(0);
        setPage3Hidden(false);
        page4TranslateX.value = withTiming(ScreenWidth);
        setPage4Hidden(true);
        break;
      }
      case 3: {
        page1TranslateX.value = withTiming(-ScreenWidth);
        setPage1Hidden(true);
        page2TranslateX.value = withTiming(-ScreenWidth);
        setPage2Hidden(true);
        page3TranslateX.value = withTiming(-ScreenWidth);
        setPage3Hidden(true);
        page4TranslateX.value = withTiming(0);
        setPage4Hidden(false);
        break;
      }
    }
  }, [page]);

  let lastX = 0;
  return (
    <GestureHandlerRootView
      onTouchStart={(e) => {
        lastX = e.nativeEvent.locationX;
      }}
      onTouchEnd={(e) => {
        const diff = e.nativeEvent.locationX - lastX;
        if (diff > 0) {
          if (page > 0) {
            setPage((cur) => cur - 1);
          }
        } else {
          if (page < 3) {
            setPage((cur) => cur + 1);
          }
        }
      }}
      className="bg-[#181A1C] h-full relative"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="flex items-center justify-center">
        {/* pages */}
        {pages.map((page, index) => (
          <Page key={index} {...page} />
        ))}

        {/* spacer */}
        <View className="h-10" />

        {page == 3 && (
          <Link href="/setup" asChild>
            <Pressable className="py-3 px-8 bg-[#F62E8E] active:bg-[#AC1AF0] mt-[-35px] rounded-[15px] flex items-center justify-center transition-colors">
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="tracking-[15%] text-[20px] text-center text-white w-full mr-[-1.1rem]"
              >
                NEXT
              </Text>
            </Pressable>
          </Link>
        )}
        {/* dots */}
        {page != 3 && (
          <View className="flex flex-row">
            <View
              className={`w-3 h-3 ${
                page == 0 ? "bg-[#ECEBED]" : "bg-[#727477]"
              } rounded-full mx-2`}
            />
            <View
              className={`w-3 h-3 ${
                page == 1 ? "bg-[#ECEBED]" : "bg-[#727477]"
              } rounded-full mx-2`}
            />
            <View
              className={`w-3 h-3 ${
                page == 2 ? "bg-[#ECEBED]" : "bg-[#727477]"
              } rounded-full mx-2`}
            />
            <View
              className={`w-3 h-3 ${
                page == 3 ? "bg-[#ECEBED]" : "bg-[#727477]"
              } rounded-full mx-2`}
            />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

type PageProps = {
  pageTranslateX: Animated.SharedValue<number>;
  MYIMAGE: any;
  Text1: string;
  hidden: boolean;
  Text2: string;
};

function Page(props: PageProps) {
  const { pageTranslateX, MYIMAGE, Text1, Text2, hidden } = props;
  if (hidden) {
    return null;
  }
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pageTranslateX }],
      }}
      className="w-[90%] mx-auto h-[80%] mt-10"
    >
      {/* main content */}
      <View className="flex flex-col items-center justify-between w-full h-[90%]">
        <MYIMAGE />
        <View className="mt-20">
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
            }}
            className="text-[#F62E8E] text-[50px] text-center"
          >
            {Text1}
          </Text>
          <View className="h-2" />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
            }}
            className="text-white text-[14px] text-center"
          >
            {Text2}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
