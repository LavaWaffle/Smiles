import { Stack, router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  Easing,
  FadeIn,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";

type MesssageProps = {
  message: string;
  time: string;
  isMe: boolean;
};

const initialMessages: MesssageProps[] = [
  {
    isMe: false,
    message: "Hey, how are you?",
    time: "12:00 PM",
  },
];

function Message(props: MesssageProps) {
  const { message, time, isMe } = props;
  if (!isMe)
    return (
      <Animated.View
        className="w-[80%] ml-[5%] flex flex-row items-start"
        entering={FadeIn}
      >
        <Image
          source={require("assets/amigos/Kim.png")}
          style={{
            width: 30,
            aspectRatio: 1,
            borderRadius: 100,
          }}
        />
        {/* spacer */}
        <View className="w-3" />

        <View className="flex flex-col justify-end items-end w-[80%]">
          <View className="w-full bg-[#323436] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl rounded-tl-md">
            <Text
              style={{ fontFamily: "Poppins_300Light" }}
              className="w-full text-[14px] text-[#ECEBED] py-2 px-2 "
            >
              {message}
            </Text>
          </View>
          {/* spacer */}
          <View className="h-1" />
          <Text
            style={{ fontFamily: "Poppins_300Light" }}
            className="text-[#727477] text-[12px]"
          >
            {time}
          </Text>
        </View>
      </Animated.View>
    );
  else {
    return (
      <Animated.View
        className="w-[80%] ml-[15%] flex flex-row items-start"
        entering={FadeIn}
      >
        <View className="flex flex-col items-end w-[80%] ml-[20%]">
          <View className="w-full bg-[#2E8AF6] rounded-br-2xl rounded-tl-2xl rounded-bl-2xl rounded-tr-md">
            <Text
              style={{ fontFamily: "Poppins_300Light" }}
              className="w-full text-[14px] text-[#ECEBED] py-2 px-2 "
            >
              {message}
            </Text>
          </View>
          {/* spacer */}
          <View className="h-1" />
          <Text
            style={{ fontFamily: "Poppins_300Light" }}
            className="text-[#727477] text-[12px]"
          >
            {time}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

// const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function Texting() {
  const translateY = useSharedValue(0);
  // const messagesHeight = useSharedValue(414);
  const [myComment, setMyComment] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);

  const flatlistRef = useRef();

  const [messages, setMessages] = useState<MesssageProps[]>(initialMessages);

  function postComment() {
    setMessages((prev) => [
      ...prev,
      {
        isMe: true,
        message: myComment,
        time: "12:01 PM",
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          isMe: false,
          message: "I'm doing great, thanks for asking",
          time: "12:02 PM",
        },
      ]);
    }, 2500);
  }

  return (
    <View className="w-full h-full bg-[#181A1C]">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="w-full h-full">
        {/* header */}
        <View className="flex flex-row justify-between items-center w-[90%] mx-auto mt-2">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Image
              style={{
                width: 40,
                aspectRatio: 1,
              }}
              source={require("assets/discover/BackIcon.svg")}
            />
          </Pressable>

          <Image
            style={{
              width: 45,
              aspectRatio: 1,
            }}
            source={require("assets/amigos/Kim.png")}
          />

          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Image
              style={{
                width: 40,
                aspectRatio: 1,
              }}
              source={require("assets/amigos/More.svg")}
            />
          </Pressable>
        </View>

        {/* spacer*/}
        <View className="h-2" />

        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
          }}
          className="w-full text-center text-[15px] text-[#ECEBED]"
        >
          Kim Badger
        </Text>

        {/* spacer*/}
        <View className="h-3" />

        {/* bar */}
        <View className="w-full h-0.5 bg-[#2D2F31]" />

        {/* spacer*/}
        <View className="h-3" />

        {/* Today */}
        <Text
          style={{
            fontFamily: "Poppins_300Light",
          }}
          className="w-full text-center text-[15px] text-[#727477] tracking-[1px]"
        >
          Today
        </Text>

        {/* spacer*/}
        <View className="h-2" />

        {/* <Animated.View
          style={{
            height: messagesHeight,
          }}
          className="w-full"
        > */}
        <FlashList
          contentContainerStyle={{}}
          // className="h-full border-2 border-white"
          ref={flatlistRef}
          data={messages}
          keyExtractor={(item, index) => item.message}
          estimatedItemSize={79}
          showsVerticalScrollIndicator={false}
          snapToEnd={true}
          renderItem={({ item }) => <Message {...item} />}
        />
        {/* </Animated.View> */}

        {/* add a comment */}
        <Animated.View
          className="bg-black w-full h-[16%] absolute bottom-0 flex items-center"
          style={{
            transform: [{ translateY }],
          }}
        >
          <View className="bg-[#323436] mt-4 w-[90%] rounded-full flex justify-between flex-row items-center">
            <TextInput
              className="w-[80%] p-2 py-3 text-white"
              placeholder="Type your comment here..."
              value={myComment}
              onChangeText={(text) => setMyComment(text)}
              onFocus={() => {
                translateY.value = withTiming(-290, {
                  duration: 450,
                  easing: Easing.bezier(0.56, 0.89, 0.18, 0.99),
                  reduceMotion: ReduceMotion.System,
                });
                setEditing(true);
              }}
              onSubmitEditing={() => {
                translateY.value = withTiming(0);
                setEditing(false);
                Keyboard.dismiss();
                postComment();
                setMyComment("");
              }}
            />

            {/* right btns */}
            <Pressable
              onPress={() => {
                translateY.value = withTiming(0);
                Keyboard.dismiss();
                postComment();
                setMyComment("");
              }}
              className="flex flex-row items-center ml-[-25px] mr-[5px]"
            >
              <Entypo name="plus" size={24} color="#727477" />
              {/* spacer */}
              <View className="w-3" />
              <Image
                style={{ width: 30, aspectRatio: 1 }}
                source={require("assets/discover/Send.svg")}
              />
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
