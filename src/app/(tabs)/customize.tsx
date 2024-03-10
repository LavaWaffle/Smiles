import { View, Text, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const customize = () => {
  const barTranslateX = useSharedValue(0);
  const screenWidth = Dimensions.get("screen").width;
  const [selected, setSelected] = useState<"emoji" | "cam" | "doc">("emoji");
  const emojiTrasnlateX = useSharedValue(0);
  const [emojiSeen, setEmojiSeen] = useState(false);
  const camTrasnlateX = useSharedValue(screenWidth);
  const [camSeen, setCamSeen] = useState(false);
  const docTrasnlateX = useSharedValue(screenWidth * 2);

  useEffect(() => {
    switch (selected) {
      case "emoji":
        barTranslateX.value = withTiming(0, { duration: 200 });
        emojiTrasnlateX.value = withTiming(0, { duration: 200 });
        setEmojiSeen(true);
        camTrasnlateX.value = withTiming(screenWidth, { duration: 200 });
        setCamSeen(false);
        docTrasnlateX.value = withTiming(screenWidth * 2, { duration: 200 });
        break;
      case "cam":
        barTranslateX.value = withTiming(screenWidth / 3, { duration: 200 });
        emojiTrasnlateX.value = withTiming(-screenWidth, { duration: 200 });
        setEmojiSeen(false);
        camTrasnlateX.value = withTiming(0, { duration: 200 });
        setCamSeen(true);
        docTrasnlateX.value = withTiming(screenWidth, { duration: 200 });
        break;
      case "doc":
        barTranslateX.value = withTiming((screenWidth / 3) * 2, {
          duration: 200,
        });
        emojiTrasnlateX.value = withTiming(-screenWidth * 2, { duration: 200 });
        setEmojiSeen(false);
        camTrasnlateX.value = withTiming(-screenWidth, { duration: 200 });
        setCamSeen(false);
        docTrasnlateX.value = withTiming(0, { duration: 200 });
        break;
    }
  }, [selected]);

  let initialX = 0;

  return (
    <View>
      <View className="relative">
        <Image
          source={require("assets/customize/Banner.png")}
          style={{
            width: "100%",
            height: 175,
          }}
        />
        <View className="absolute bottom-0 left-1/2 translate-x-[-72.5] translate-y-[72.5]">
          <Image
            source={require("assets/customize/ProfilePic.png")}
            style={{
              aspectRatio: 1,
              width: 145,
            }}
          />
        </View>
        <View className="absolute bottom-0 left-1/2 bg-white rounded-full translate-x-[40] translate-y-[70]">
          <Image
            source={require("assets/customize/Plus.svg")}
            style={{ aspectRatio: 1, width: 35 }}
          />
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 145 / 2 + 18 }} />

      <Text
        style={{ fontFamily: "Poppins_600SemiBold" }}
        className="text-center text-white text-[18px]"
      >
        Jessica Thompson
      </Text>

      {/* spacer */}
      <View style={{ height: 2 }} />

      <Text
        style={{ fontFamily: "Poppins_300Light" }}
        className="text-center text-[#727477] text-[13px]"
      >
        Hopewell Valley Central HS
      </Text>

      {/* spacer */}
      <View style={{ height: 3 }} />

      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-center text-[#ECEBED] text-[13px]"
      >
        Writer by Profession. Artist by Passion!
      </Text>

      {/* spacer */}
      <View style={{ height: 20 }} />

      {/* rando stuff idk man */}
      <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
        {/* followers */}
        <View className="w-[57%] flex-row justify-between">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-[#727477]"
          >
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white"
            >
              2,467
            </Text>
            {"\n"}
            Followers
          </Text>
          {/* following */}
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-[#727477]"
          >
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white"
            >
              1,589
            </Text>
            {"\n"}
            Following
          </Text>
        </View>

        {/* edit */}
        <View className="px-3 py-2 rounded-full border-2 border-[#727477]">
          <Text
            style={{ fontFamily: "Poppins_600SemiBold" }}
            className="text-white text-[14px] text-center"
          >
            Edit Profile
          </Text>
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 10 }} />

      {/* slider */}
      <View className="w-[80%] mx-auto flex flex-row justify-between items-center">
        <Pressable onPress={() => setSelected("emoji")}>
          <Image
            source={require("assets/customize/Smile.png")}
            style={{ aspectRatio: 1, width: 35 }}
          />
        </Pressable>
        <Pressable onPress={() => setSelected("cam")}>
          <Image
            source={require("assets/customize/Camera.png")}
            style={{ aspectRatio: 1.1, width: 35 }}
          />
        </Pressable>
        <Pressable onPress={() => setSelected("doc")}>
          <Image
            source={require("assets/customize/Doc.png")}
            style={{ aspectRatio: 1, width: 35 }}
          />
        </Pressable>
      </View>

      {/* spacer */}
      <View style={{ height: 5 }} />

      {/* moving bar */}
      <Animated.View
        style={{
          transform: [{ translateX: barTranslateX }],
        }}
        className="w-[33%] h-[2px] bg-white rounded-full"
      />

      {/* spacer */}
      <View style={{ height: 10 }} />

      <GestureHandlerRootView
        onTouchStart={(e) => (initialX = e.nativeEvent.locationX)}
        onTouchEnd={(e) => {
          const finalX = e.nativeEvent.locationX;
          const difference = finalX - initialX;
          if (selected === "emoji" && difference < -50) setSelected("cam");
          if (selected === "emoji" && difference > 50) setSelected("doc");
          if (selected === "cam" && difference < -50) setSelected("doc");
          if (selected === "cam" && difference > 50) setSelected("emoji");
          if (selected === "doc" && difference < -50) setSelected("emoji");
          if (selected === "doc" && difference > 50) setSelected("cam");
        }}
      >
        {/* emoji */}
        <Animated.View
          style={{
            transform: [{ translateX: emojiTrasnlateX }],
          }}
          className={`w-full h-full ${!emojiSeen && "hidden"}`}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
            }}
            className="text-white text-[16px] ml-5"
          >
            Interests
          </Text>

          {/* spacer */}
          <View style={{ height: 15 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/EmojiCS.png")}
                style={{
                  width: 40,
                  aspectRatio: 1,
                }}
              />

              {/* spacer */}
              <View style={{ width: 15 }} />

              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-[#ECEBED] text-[16px] w-[55%] text-center"
              >
                Computer Science
              </Text>
            </View>
          </View>

          {/* spacer */}
          <View style={{ height: 10 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/EmojiRuler.png")}
                style={{
                  width: 40,
                  aspectRatio: 1,
                }}
              />

              {/* spacer */}
              <View style={{ width: 15 }} />

              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-[#ECEBED] text-[16px] w-[55%] text-center"
              >
                Math
              </Text>
            </View>
          </View>
        </Animated.View>
        {/* camera */}
        <Animated.View
          style={{
            transform: [{ translateX: camTrasnlateX }],
          }}
          className={`w-full h-full bg-white ${!camSeen && "hidden"}`}
        >
          <Text>CAMERA</Text>
        </Animated.View>
        {/* doc */}
        <Animated.View
          style={{
            transform: [{ translateX: docTrasnlateX }],
          }}
          className="w-full h-full bg-white"
        >
          <Text>DOC</Text>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default customize;
