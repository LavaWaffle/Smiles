import { Stack, router } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function ShareResume() {
  const translateY = useSharedValue(100);
  const confettiRef = useRef<LottieView>(null);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  return (
    <GestureHandlerRootView>
      <View className="relative">
        <LottieView
          ref={confettiRef}
          source={require("assets/Confetti.json")}
          autoPlay={false}
          loop={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            pointerEvents: "none",
          }}
          resizeMode="cover"
        />
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute z-10 bg-[#2E8AF6] flex items-center justify-center w-[95%] mx-auto h-[70px] rounded-[20px] bottom-0 left-[2.5%]"
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 25,
              color: "white",
            }}
          >
            Resume Sent!
          </Text>
        </Animated.View>

        <Stack.Screen
          options={{
            headerTitle: "Share Resume",
            headerStyle: {
              backgroundColor: "#181A1C",
            },
            headerBackTitleVisible: false,
            headerBackImageSource: require("assets/discover/BackIcon.svg"),
            headerBackVisible: false,
            headerTitleStyle: {
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#ECEBED",
            },
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Image
                  style={{
                    width: 33,
                    aspectRatio: 1,
                    marginLeft: -5,
                    marginTop: -10,
                  }}
                  source={require("assets/discover/BackIcon.svg")}
                />
              </Pressable>
            ),
          }}
        />
        <View className="w-full h-full bg-[#181A1C] flex items-center">
          {/* spacer */}
          <View style={{ height: 30 }}></View>
          {/* text */}
          <Text
            style={{ fontFamily: "Poppins_500Medium", fontSize: 18 }}
            className="text-white"
          >
            Auto-Generated Resume
          </Text>
          {/* spacer */}
          <View style={{ height: 20 }}></View>
          {/* resume */}
          <View
            style={{ width: 290, aspectRatio: 317 / 411 }}
            className=" items-start"
          >
            <ImageZoom
              style={{ width: "100%", height: "100%" }}
              source={require("assets/feed/resume.png")}
            />
          </View>
          {/* spacer */}
          <View style={{ height: 20 }}></View>
          {/* btn */}
          <Pressable
            onPress={() => {
              translateY.value = withTiming(-350, { duration: 750 });

              setTimeout(() => {
                triggerConfetti();
              }, 250);

              setTimeout(() => {
                translateY.value = withTiming(100, { duration: 750 });
              }, 1500);
              setTimeout(() => {
                router.back();
              }, 2000);
            }}
            className="py-3 px-10 transition-colors duration-200 bg-[#F62E8E] active:bg-[#AC1AF0] rounded-[30px]"
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 36,
                color: "white",
              }}
              className="tracking-[7px]"
            >
              SEND
            </Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
