import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { Chip } from "./discover";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const chipData = ["Robotics", "FBLA", "Sports", "HOSA", "DECA"];

function MyChip(props: { item: string }) {
  const [clicked, setClicked] = useState(false);
  return (
    <Chip
      text={props.item}
      first={false}
      clicked={clicked}
      onClick={() => {
        setClicked((cur) => !cur);
      }}
    />
  );
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const create = () => {
  const [text, onChangeText] = useState("");

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  requestPermission();
  let camera: Camera;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const borderColorProgress = useSharedValue(0);

  const borderAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        borderColorProgress.value,
        [0, 1],
        ["white", "#F62E8E"]
      ),
    };
  });

  const rightButtonProgress = useSharedValue(0);

  const rightButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rightButtonProgress.value, [0, 1], [1, 0]),
    };
  });

  const [shouldHide, setShouldHide] = useState(false);

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: "Create",
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
            <Pressable onPress={() => {}} className="ml-2">
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 14,
                  color: "#2E8AF6",
                }}
              >
                Discard
              </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/discover",
                  params: { text: text, image: capturedImage.uri },
                });
              }}
              className="bg-[#F62E8E] py-1 px-3 rounded-full mr-2"
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 14,
                  color: "white",
                }}
              >
                Publish
              </Text>
            </Pressable>
          ),
        }}
      />

      {/* spacer */}
      <View className="h-4" />

      {/* content */}
      <View className="h-full w-[90%] mx-auto flex flex-col items-start">
        {/* line 1 */}
        <View className="flex flex-row items-center ">
          <Image
            style={{
              width: 40,
              aspectRatio: 1,
              marginRight: 10,
            }}
            source={require("assets/create/ProfilePic.png")}
          />
          <TextInput
            className="w-full text-white text-xl"
            placeholder="What's on your mind?"
            value={text}
            onChangeText={(text) => onChangeText(text)}
          />
        </View>

        {/* spacer */}
        <View className="h-4" />

        {/* line 2 */}
        <View className="w-full h-10">
          <FlashList
            data={chipData}
            keyExtractor={(item) => item + "saff"}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={36}
            renderItem={({ item, index }) => <MyChip item={item} />}
          />
        </View>

        {/* spacer */}
        <View className="h-4" />

        {/* line 3 */}
        <View className="flex items-center justify-center w-full"></View>

        <View className="w-full relative" style={{ height: 415 }}>
          <TouchableOpacity
            className="aspect-square w-16 absolute bottom-3 left-3 z-10 items-center justify-center bg-[#323436] rounded-full"
            onPress={() => {
              if (previewVisible && capturedImage) {
                setPreviewVisible(false);
                setShouldHide(false);
                borderColorProgress.value = withTiming(0, { duration: 500 });
                rightButtonProgress.value = withTiming(0, { duration: 500 });
                setShouldHide(false);
              } else if (permission.granted) {
                setType((cur) =>
                  cur === CameraType.front ? CameraType.back : CameraType.front
                );
              } else {
                requestPermission();
              }
            }}
          >
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </TouchableOpacity>
          <AnimatedTouchableOpacity
            style={rightButtonAnimatedStyle}
            className={`${
              shouldHide ? "hidden" : ""
            } aspect-square w-16 absolute bottom-3 right-3 z-10 items-center justify-center bg-[#323436] rounded-full`}
            onPress={() => {
              if (permission.granted && camera) {
                // take picture
                camera.takePictureAsync().then((pic) => {
                  // console.log(pic);
                  setPreviewVisible(true);
                  setCapturedImage(pic);
                  borderColorProgress.value = withTiming(1, { duration: 500 });
                  rightButtonProgress.value = withTiming(1, { duration: 500 });
                  setTimeout(() => {
                    setShouldHide(true);
                  }, 0);
                });
              } else {
                requestPermission();
              }
            }}
          >
            <Ionicons name="camera-outline" size={30} color="white" />
          </AnimatedTouchableOpacity>
          <Animated.View
            style={[
              {
                borderWidth: 2,

                borderRadius: 20,
                overflow: "hidden",
              },
              borderAnimatedStyle,
            ]}
          >
            {previewVisible && capturedImage ? (
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{ uri: capturedImage.uri }}
              />
            ) : (
              <Camera
                type={type}
                ref={(r) => {
                  camera = r;
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></Camera>
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default create;
