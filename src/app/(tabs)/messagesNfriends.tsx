import { View, Text, SafeAreaView, Pressable, Dimensions } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

type friendMsgProps = {
  profilePic: NodeRequire;
  name: string;
  msg: string;
  time: string;
};

const friendMsgs: friendMsgProps[] = [
  {
    profilePic: require("assets/amigos/Kim.png"),
    name: "Kim Badger",
    msg: "Hey, how are you?",
    time: "4h ago",
  },
  {
    profilePic: require("assets/amigos/Steve.png"),
    name: "Steve Jobs",
    msg: "Can't Wait for FBLA!",
    time: "5h ago",
  },
  {
    profilePic: require("assets/amigos/Mia.png"),
    name: "Mia Khalifa",
    msg: "I'm so excited!",
    time: "6h ago",
  },
  {
    profilePic: require("assets/amigos/Leslie.png"),
    name: "Leslie Brown",
    msg: "See you there!",
    time: "7h ago",
  },
];

function FriendMsg(props: friendMsgProps) {
  const { profilePic, name, msg, time } = props;
  return (
    <Fragment>
      <Pressable
        onPress={() => {
          console.log(name);
          router.push("/texting");
        }}
        className="flex flex-row items-start justify-between w-[90%] mx-auto my-5"
      >
        {/* left */}
        <View className="flex flex-row items-center">
          {/* profile pic */}
          <Image
            source={profilePic as unknown as string}
            style={{ width: 50, aspectRatio: 1 }}
          />
          {/* spacer */}
          <View style={{ width: 10 }}></View>
          {/* text */}
          <View className="flex flex-col justify-between items-stretch h-[50px]">
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
              }}
              className="text-[#ECEBED] text-[14px]"
            >
              {name}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_200ExtraLight",
              }}
              className="text-[#727477] text-[13px]"
            >
              {msg}
            </Text>
          </View>
        </View>
        {/* right */}
        <View>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
            }}
            className="text-[#727477] text-[12px]"
          >
            {time}
          </Text>
        </View>
      </Pressable>
      {/* spacer */}
      <View style={{ height: 2 }} />
      {/* bar */}
      <View className="w-[2sw] ml-[-10rem] bg-[#323436] h-[1px]" />
      <View style={{ height: 0 }} />
    </Fragment>
  );
}

type ElementProps = {
  source: NodeRequire;
  text: JSX.Element;
  time: string;
};

const ElementsUno: ElementProps[] = [
  {
    source: require("assets/amigos/ThumbsUp.png"),
    text: (
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
        className="text-white text-[14px] text-wrap whitespace-normal "
      >
        <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
          Sofia, John and +19 others
        </Text>
        {"\n"}liked your post.
      </Text>
    ),
    time: "10m ago",
  },
  {
    source: require("assets/amigos/ThumbsUp.png"),
    text: (
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
        className="text-white text-[14px] text-wrap whitespace-normal "
      >
        <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
          Red, Daisy and +11 others
        </Text>
        {"\n"}liked your post.
      </Text>
    ),
    time: "30m ago",
  },
];

const ElementsDos: ElementProps[] = [
  {
    source: require("assets/amigos/Comment.png"),
    time: "1d ago",
    text: (
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
        className="text-white text-[14px] text-wrap whitespace-normal opacity-90"
      >
        <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
          Blue, Denver and +2 others
        </Text>
        {"\n"}commented on your post.
      </Text>
    ),
  },
  {
    source: require("assets/amigos/S.png"),
    time: "1d ago",
    text: (
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
        className="text-white text-[14px] text-wrap whitespace-normal opacity-90"
      >
        <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
          Savannah Wilson
        </Text>{" "}
        is {"\n"}celebrating her birthday 🎉
      </Text>
    ),
  },
  {
    source: require("assets/amigos/@.png"),
    time: "1d ago",
    text: (
      <Text
        style={{
          fontFamily: "Poppins_300Light",
        }}
        className="text-white text-[14px] text-wrap whitespace-normal opacity-90"
      >
        <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Ralph Edwards</Text>{" "}
        mentioned {"\n"}you in a post.
      </Text>
    ),
  },
];

function Element(props: ElementProps) {
  const { source, text, time } = props;
  return (
    <Fragment>
      <View className="flex flex-row justify-start items-start">
        <Image
          source={source as unknown as string}
          style={{ width: 45, aspectRatio: 1 }}
        />
        {/* spacer */}
        <View style={{ width: 18 }}></View>
        {/* text stuff */}
        <View>
          {text}
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
            }}
            className="text-[#727477] text-[12px] mt-1"
          >
            {time}
          </Text>
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 10 }} />

      {/* bar */}
      <View className="w-[2sw] ml-[-10rem] bg-[#323436] h-[1px]" />

      <View style={{ height: 10 }} />
    </Fragment>
  );
}

const messagesNfriends = () => {
  const [pref, setPref] = useState<"Messages" | "Alerts">("Messages");

  const barTranslateX = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const messageTranslateX = useSharedValue(0);
  const alertTranslateX = useSharedValue(screenWidth);

  const [messageContentDisplay, setMessageContentDisplay] = useState<
    "flex" | "none"
  >("flex");

  useEffect(() => {
    barTranslateX.value = withTiming(
      pref === "Messages" ? 0 : screenWidth / 2,
      { duration: 200 }
    );
    messageTranslateX.value = withTiming(
      pref === "Messages" ? 0 : -screenWidth,
      { duration: 200 }
    );
    alertTranslateX.value = withTiming(pref === "Alerts" ? 0 : screenWidth, {
      duration: 200,
    });
    setTimeout(() => {
      setMessageContentDisplay(pref === "Messages" ? "flex" : "none");
    }, 0);
  }, [pref]);

  let initialX = 0;

  return (
    <GestureHandlerRootView
      onTouchStart={(e) => (initialX = e.nativeEvent.locationX)}
      onTouchEnd={(e) => {
        console.log(e.nativeEvent.locationX - initialX);
        if (e.nativeEvent.locationX - initialX > 50) {
          setPref("Messages");
        } else if (e.nativeEvent.locationX - initialX < -50) {
          setPref("Alerts");
        }
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <SafeAreaView>
        {/* Messages n Alerts */}
        <View className="flex flex-row">
          {/* Messages */}
          <Pressable
            onPress={() => setPref("Messages")}
            className="w-1/2 py-2 flex items-center justify-center"
          >
            <View className="flex flex-row items-center">
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                }}
                className="text-[#ECEBED] text-[14px]"
              >
                Messages
              </Text>
              <View className="w-4 ml-2 rounded-[99px] aspect-square bg-[#F62E8E]"></View>
            </View>
          </Pressable>
          {/* Alerts */}
          <Pressable
            onPress={() => setPref("Alerts")}
            className="w-1/2 py-2 flex items-center justify-center"
          >
            <View className="flex flex-row items-center">
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                }}
                className="text-[#ECEBED] text-[14px]"
              >
                Alerts
              </Text>
              <View className="w-4 ml-2 rounded-[99px] aspect-square bg-[#F62E8E]"></View>
            </View>
          </Pressable>
        </View>

        {/* spacer */}
        <View style={{ height: 10 }}></View>
        {/* Bar */}
        <Animated.View
          style={{
            width: "50%",
            height: 1,
            transform: [{ translateX: barTranslateX }],
          }}
          className="bg-[#ECEBED]"
        />
        {/* messages content */}
        <Animated.View
          style={{
            transform: [{ translateX: messageTranslateX }],
            display: messageContentDisplay,
          }}
        >
          {/* search bar */}
          <View className="flex items-center justify-center w-full py-6 pt-8">
            <View className="bg-[#323436] flex flex-row items-center justify-between w-[90%] py-3 px-4 rounded-full">
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                }}
                className="text-[#ECEBED] text-[14px]"
              >
                Search friends...
              </Text>
              <Feather name="search" size={24} color="#727477" />
            </View>
          </View>
          {/* bar */}
          <View className="bg-[#323436] w-screen h-[2px]" />
          {/* pinned */}
          <View className="w-[90%] mx-auto py-4">
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
              }}
              className="text-[#727477] text-[12px]"
            >
              PINNED
            </Text>
            {/* spacer */}
            <View style={{ height: 10 }}></View>
            {/* pinned amigos */}
            <View className="flex items-center flex-row justify-start">
              <View className="flex flex-col items-center mr-7">
                <Image
                  source={require("assets/amigos/Kim.png")}
                  style={{
                    width: 50,
                    aspectRatio: 1,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                  }}
                  className="text-white text-[12px] mt-2"
                >
                  Kim
                </Text>
              </View>
              <View className="flex flex-col items-center mr-7">
                <Image
                  source={require("assets/amigos/Steve.png")}
                  style={{
                    width: 50,
                    aspectRatio: 1,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                  }}
                  className="text-white text-[12px] mt-2"
                >
                  Steve
                </Text>
              </View>
              <View className="flex flex-col items-center mr-7">
                <Image
                  source={require("assets/amigos/Mia.png")}
                  style={{
                    width: 50,
                    aspectRatio: 1,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                  }}
                  className="text-white text-[12px] mt-2"
                >
                  Mia
                </Text>
              </View>
            </View>
          </View>
          {/* bar */}
          <View className="bg-[#323436] w-screen h-[2px]" />
          {/* actual amigos fr this time */}
          <View className="w-full h-full">
            <FlashList
              data={friendMsgs}
              keyExtractor={(item) => item.name}
              estimatedItemSize={100}
              renderItem={({ item }) => <FriendMsg {...item} />}
            />
          </View>
        </Animated.View>

        {/* alerts */}
        <Animated.View
          style={{
            transform: [{ translateX: alertTranslateX }],
          }}
          className="w-full h-full z-10"
        >
          <View className="w-[90%] mx-auto">
            {/* spacer */}
            <View style={{ height: 10 }}></View>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
              }}
              className="text-[#727477] text-[15px] mt-2 tracking-[1px]"
            >
              Today
            </Text>

            {/* spacer */}
            <View style={{ height: 30 }}></View>

            {/* elements */}
            <View className="h-[166]">
              <FlashList
                data={ElementsUno}
                keyExtractor={(item) =>
                  (item.time + item.source) as unknown as string
                }
                showsVerticalScrollIndicator={false}
                estimatedItemSize={83}
                renderItem={({ item }) => <Element {...item} />}
              />
            </View>

            {/* spacer */}
            <View style={{ height: 15 }}></View>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
              }}
              className="text-[#727477] text-[15px] mt-2 tracking-[1px]"
            >
              Yesterday
            </Text>

            {/* spacer */}
            <View style={{ height: 18 }} />

            {/* elements */}
            <View className="h-[249]">
              <FlashList
                data={ElementsDos}
                keyExtractor={(item) =>
                  (item.time + item.source) as unknown as string
                }
                showsVerticalScrollIndicator={false}
                estimatedItemSize={83}
                renderItem={({ item }) => <Element {...item} />}
              />
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default messagesNfriends;
