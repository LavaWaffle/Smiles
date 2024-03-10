// TODO: Modify this file to the tutorial
import { Redirect, Stack, router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Page() {
  const [sProf, sSprof] = useState<NodeRequire>(require("assets/PICON.png"));
  const [sBanner, sSBanner] = useState<NodeRequire>(require("assets/PBG.png"));

  const translateY = useSharedValue(0);

  const fuckThis = useSharedValue(0);
  const opacityProp = useAnimatedStyle(() => {
    return {
      opacity: interpolate(fuckThis.value, [0, 1], [0, 1]),
    };
  });

  return (
    <View className="bg-[#181A1C] h-full relative">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Pressable
        className="absolute top-10 right-4 z-10"
        onPress={() => {
          router.replace("/feed");
        }}
      >
        <Text className="text-white opacity-25">Skip</Text>
      </Pressable>
      <SafeAreaView className="w-[90%] mx-auto">
        {/* spacer */}
        <View className="h-10" />
        <Pressable
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            console.log("DONE");
            sSprof(require("assets/customize/ProfilePic.png"));
          }}
        >
          <Text
            className="text-white text-[18px] ml-2"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Upload a profile picture
          </Text>
          <View className="flex items-center justify-center py-5">
            <Image
              source={sProf as unknown as string}
              style={{ width: 140, aspectRatio: 1 }}
            />
          </View>
        </Pressable>

        {/* spacer */}
        <View className="h-0" />
        <Pressable
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            console.log("DONE");
            sSBanner(require("assets/customize/Banner.png"));
          }}
        >
          <Text
            className="text-white text-[18px] ml-2"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Upload a banner
          </Text>
          <View className="flex items-center justify-center py-5">
            <Image
              source={sBanner as unknown as string}
              style={{ width: 250, aspectRatio: 300 / 138, borderRadius: 10 }}
            />
          </View>
        </Pressable>

        <Text
          className="text-white text-[18px] ml-2"
          style={{ fontFamily: "Poppins_700Bold" }}
        >
          Add a description
        </Text>

        {/* spacer */}
        <View className="h-5" />

        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          <TextInput
            style={{
              textAlignVertical: "top",
            }}
            multiline={true}
            onFocus={() => {
              translateY.value = withTiming(-320, { duration: 500 });
              fuckThis.value = withTiming(1, { duration: 500 });
            }}
            onEndEditing={() => {
              translateY.value = withTiming(0, { duration: 500 });
              fuckThis.value = withTiming(0, { duration: 500 });
            }}
            className="w-[full] relative h-[100px] border-2 py-5 px-6 text-start rounded-[15px] border-white bg-[#181A1C] text-white"
          ></TextInput>
          <AnimatedPressable
            className="absolute bottom-2 right-2"
            style={[opacityProp]}
            onPress={() => {
              translateY.value = withTiming(0, { duration: 500 });
              fuckThis.value = withTiming(0, { duration: 500 });
              Keyboard.dismiss();
            }}
          >
            <Image
              source={require("assets/send.svg")}
              style={{ width: 30, aspectRatio: 1 }}
            />
          </AnimatedPressable>
        </Animated.View>

        <Pressable
          className="flex flex-row justify-end items-center w-[105%] mx-auto mt-6"
          onPress={() => {
            router.replace("/feed");
          }}
        >
          <View />
          <MaterialIcons name="navigate-next" size={36} color="white" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
