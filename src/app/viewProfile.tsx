import { View, Text, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import Animated, {
  FadeIn,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

const AniFeather = Animated.createAnimatedComponent(Feather);
const AniEntypo = Animated.createAnimatedComponent(Entypo);
const AniAntDesign = Animated.createAnimatedComponent(AntDesign);
const AnimatedImage = Animated.createAnimatedComponent(Image);

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
    <View className="bg-[#181A1C]">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="relative">
        <Image
          source={require("assets/feed/Card1.png")}
          style={{
            width: "100%",
            height: 150,
          }}
        />
        <Animated.View
          //   sharedTransitionTag="profilePic"
          className="absolute bottom-0 left-1/2 translate-x-[-72.5] translate-y-[72.5]"
        >
          <Animated.Image
            sharedTransitionTag="profilePic"
            source={require("assets/feed/Profile1.png")}
            style={{
              height: 145,
              width: 145,
            }}
          />
        </Animated.View>
        <View className="absolute bottom-0 left-1/2 translate-x-[35] translate-y-[65]">
          <Image
            source={require("assets/profile/Check.png")}
            style={{ aspectRatio: 1, width: 35 }}
          />
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 145 / 2 + 18 }} />

      <Animated.Text
        style={{ fontFamily: "Poppins_600SemiBold" }}
        className="text-center text-white text-[18px]"
        // sharedTransitionTag="name"
      >
        Kat Williams
      </Animated.Text>

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
        I design experiences mostly. I also sometimes travel.
      </Text>

      {/* spacer */}
      <View style={{ height: 20 }} />

      {/* rando stuff idk man */}
      <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
        {/* followers */}
        <View className="w-[66%] flex-row justify-between">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-[#727477]"
          >
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white"
            >
              6.2M
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
              10.8k
            </Text>
            {"\n"}
            Following
          </Text>
        </View>

        {/* edit */}
        <View className="px-4 py-2 rounded-full bg-[#F62E8E]">
          <Text
            style={{ fontFamily: "Poppins_600SemiBold" }}
            className="text-white text-[14px] text-center"
          >
            Follow
          </Text>
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 10 }} />

      {/* more shit */}
      <View className="flex flex-row w-[90%]  mx-auto justify-between itemscenter">
        <View className="flex items-center flex-row">
          <Image
            source={require("assets/profile/Group.png")}
            style={{
              width: 75,
              height: 32,
            }}
          />
          {/* spacer */}
          <View className="w-2" />

          <Text
            style={{
              fontFamily: "Poppins_300Light",
            }}
            className="text-white text-[13px] opacity-70"
          >
            Mutuals
          </Text>
        </View>

        {/* right */}
        <Link href="/classes" asChild>
          <Pressable className="bg-[#2E8AF6] active:bg-[#4b97ed] transition-colors px-4 py-2 rounded-full flex-row items-center">
            <Text
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-white text-[14px] text-center"
            >
              Classes
            </Text>
            {/* spacer */}
            <View className="w-2" />
            <Image
              source={require("assets/profile/Classes.png")}
              style={{
                marginTop: -4,
                width: 30,
                aspectRatio: 1,
              }}
            />
          </Pressable>
        </Link>
      </View>

      {/* spacer */}
      <View className="h-4" />

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
            Languages
          </Text>

          {/* spacer */}
          <View style={{ height: 15 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/EmojiBrit.png")}
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
                English
              </Text>
            </View>
          </View>

          {/* spacer */}
          <View style={{ height: 10 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/EmojiItalian.png")}
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
                Italian
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* camera */}
        <Animated.View
          style={{
            transform: [{ translateX: camTrasnlateX }],
          }}
          className={`w-full h-full ${!camSeen && "hidden"}`}
        >
          {/* view */}
          <View className="w-[90%] mx-auto mt-0">
            <MyPost
              author="Kat Williams"
              comments="1.2k"
              description="I can't believe were going to FBLA tomorrow! I'm so excited to see everyone there!"
              likes="5k"
              profilePic={require("assets/feed/Profile1.png")}
              shares="3.5k"
              timeAgo="1d ago"
            />
          </View>
        </Animated.View>
        {/* doc */}
        <Animated.View
          style={{
            transform: [{ translateX: docTrasnlateX }],
          }}
          className="w-full h-full"
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
            }}
            className="text-white text-[16px] ml-5"
          >
            Extracurriculars
          </Text>

          {/* spacer */}
          <View style={{ height: 15 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/DocMusic.png")}
                style={{
                  width: 40,
                  aspectRatio: 1,
                }}
              />

              {/* spacer */}
              <View style={{ width: 15 }} />

              <View className="w-[60%]">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-[15px] text-left"
                >
                  Orchestra
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_400Regular" }}
                  className="text-[#C4C4C4] text-[13px] text-left"
                >
                  14 • Present (10 years)
                </Text>
              </View>
            </View>
          </View>

          {/* spacer */}
          <View style={{ height: 10 }} />

          <View className="flex items-center justify-center">
            <View className="flex-row items-center">
              <Image
                source={require("assets/customize/DocBlood.png")}
                style={{
                  width: 40,
                  aspectRatio: 1,
                }}
              />

              {/* spacer */}
              <View style={{ width: 15 }} />

              <View className="w-[60%]">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-[15px] text-left"
                >
                  Red Cross Society
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_400Regular" }}
                  className="text-[#C4C4C4] text-[13px] text-left"
                >
                  20 • Present (4 years)
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default customize;

type FuncPost = {
  author: string;
  timeAgo: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  profilePic: NodeRequire;
};

function MyPost(props: FuncPost) {
  const { author, timeAgo, description, likes, comments, shares, profilePic } =
    props;

  const [index, setIndex] = useState(0);

  const likeSharedValue = useSharedValue(0);
  const likeProps = useAnimatedStyle(() => {
    let color = interpolateColor(
      likeSharedValue.value,
      [0, 1],
      ["#ECEBED", "#F62E8E"]
    );
    return {
      color,
    };
  });

  const shareSharedValue = useSharedValue(0);
  const shareProps = useAnimatedStyle(() => {
    let color = interpolateColor(
      shareSharedValue.value,
      [0, 1],
      ["#ECEBED", "#F62E8E"]
    );
    return {
      color,
    };
  });

  const bookmarkSharedValue = useSharedValue(0);
  const bookmarkProps = useAnimatedStyle(() => {
    let color = interpolateColor(
      bookmarkSharedValue.value,
      [0, 1],
      ["#ECEBED", "#F62E8E"]
    );
    return {
      color,
    };
  });

  return (
    <Animated.View
      className="w-[90%] mx-auto mt-4"
      key={author}
      entering={FadeIn}
    >
      {/* Profile */}
      <View className="flex flex-row w-full">
        <Image
          source={profilePic as unknown as string}
          style={{ width: 42, aspectRatio: 1 }}
        />

        {/* spacer */}
        <View className="w-4" />

        {/* name */}

        <View className="flex justify-between">
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
            }}
            className="text-[#ECEBED] text-[14px]"
          >
            {author}
          </Text>

          <Text
            style={{
              fontFamily: "Poppins_400Regular",
            }}
            className="text-[#727477] text-[12px]"
          >
            {timeAgo}
          </Text>
        </View>
      </View>

      {/* spacer */}
      <View className="h-3" />

      {/* Description */}
      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-white text-[13px]"
      >
        {description}
      </Text>

      {/* spacer */}
      <View className="h-3" />

      {/* Lots of icons */}
      <View className="flex flex-row justify-between">
        {/* left */}
        <View className="flex flex-row space-x-4">
          <Pressable
            className="flex flex-row space-x-2"
            onPress={() => {
              likeSharedValue.value = withTiming(
                likeSharedValue.value ? 0 : 1,
                { duration: 250 }
              );
            }}
          >
            <AniFeather name="thumbs-up" size={20} animatedProps={likeProps} />
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-white ml-2"
            >
              {likes}
            </Text>
          </Pressable>

          <Pressable className="flex flex-row ml-4" onPress={() => {}}>
            <AniAntDesign
              name="message1"
              size={20}
              color="#ECEBED"
              className="text-[#ECEBED]"
            />
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-white ml-2"
            >
              {comments}
            </Text>
          </Pressable>

          <Pressable className="flex flex-row ml-4" onPress={async () => {}}>
            <AniEntypo name="share" size={20} animatedProps={shareProps} />
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-white ml-2"
            >
              {shares}
            </Text>
          </Pressable>
        </View>
        {/* right */}
        <View>
          <Pressable
            className="px-2"
            onPress={() => {
              bookmarkSharedValue.value = withTiming(
                bookmarkSharedValue.value ? 0 : 1,
                { duration: 250 }
              );
            }}
          >
            <AniFeather
              name="bookmark"
              size={20}
              animatedProps={bookmarkProps}
            />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
