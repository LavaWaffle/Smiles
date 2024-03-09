import {
  Stack,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Post, postData } from "../(tabs)/discover";
import { Entypo, Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  Easing,
  ReduceMotion,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";

type Comment = {
  profilePic: NodeRequire;
  username: string;
  content: string;
  timeAgo: string;
  numLikes: number;
};

const initialComments: Comment[] = [
  {
    profilePic: require("assets/discover/CommentProfPic1.png"),
    username: "Jessica Thompson",
    content: "❤️",
    timeAgo: "2 hours ago",
    numLikes: 5,
  },
  {
    profilePic: require("assets/discover/CommentProfPic2.png"),
    username: "Dustin Grant",
    content: "Lol 😆",
    timeAgo: "3 hours ago",
    numLikes: 2,
  },
  {
    profilePic: require("assets/discover/CommentProfPic3.png"),
    username: "Leslie Alexander",
    content: "Very true!",
    timeAgo: "5 hours ago",
    numLikes: 1,
  },
  {
    profilePic: require("assets/discover/CommentProfPic4.png"),
    username: "Kat Williams",
    content: "😊",
    timeAgo: "6 hours ago",
    numLikes: 0,
  },
  {
    profilePic: require("assets/discover/CommentProfPic4.png"),
    username: "Katd Williams",
    content: "😊",
    timeAgo: "6 hours ago",
    numLikes: 0,
  },
  {
    profilePic: require("assets/discover/CommentProfPic4.png"),
    username: "Katf Williams",
    content: "😊",
    timeAgo: "6 hours ago",
    numLikes: 0,
  },
];

const AniFeather = Animated.createAnimatedComponent(Feather);

function badInput(input: string) {
  return false;
}

function Comment(props: Comment) {
  const { profilePic, username, content, timeAgo, numLikes } = props;

  // TODO: example for user input validation
  const [liked, setLiked] = useState<number>(numLikes);

  const likeSharedValue = useSharedValue(0);
  const likeProps = useAnimatedStyle(() => {
    let color = interpolateColor(
      likeSharedValue.value,
      [0, 1],
      ["#727477", "#F62E8E"]
    );

    return {
      color,
    };
  });

  return (
    <View
      key={username + content}
      className="flex-row justify-between flex items-center mx-[5%] mb-4"
    >
      {/* user stuff */}
      <View className="flex flex-row items-start">
        {/* profile pic */}
        <Image
          source={profilePic as unknown as string}
          style={{ width: 40, aspectRatio: 1, borderRadius: 100 }}
        />

        {/* spacer */}
        <View className="w-3" />

        {/* list of stuff */}
        <View>
          <Text
            style={{ fontFamily: "Poppins_600SemiBold" }}
            className="text-[12px] text-[#c8c7c9]"
          >
            {username}
          </Text>
          <Text
            style={{ fontFamily: "Poppins_300Light" }}
            className="text-[13px] text-white mt-[-2px]"
          >
            {content}
          </Text>
          <Text
            style={{ fontFamily: "Poppins_300Light" }}
            className="text-[#727477] text-[12px]"
          >
            {timeAgo} • {liked} likes
          </Text>
        </View>
      </View>

      {/* like btn */}
      <Pressable
        className="p-2"
        onPress={() => {
          setLiked(liked == numLikes ? liked + 1 : numLikes);
          likeSharedValue.value = withTiming(liked == numLikes ? 1 : 0, {
            duration: 250,
          });
        }}
      >
        <AniFeather name="thumbs-up" size={20} animatedProps={likeProps} />
      </Pressable>
    </View>
  );
}

export default function PostView() {
  //   const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const postIndex = local.postIndex as unknown as number;
  const contentIndex = local.contentIndex as unknown as number;
  // console.log("Global:", local)
  // console.log("post:", postIndex, "content:", contentIndex);

  const translateY = useSharedValue(0);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // TODO: example for user input validation
  const [myComment, setMyComment] = useState<string>("");

  function postComment() {
    // if input is harmful, don't post
    if (badInput(myComment)) return;

    // add to comments
    setComments([
      {
        profilePic: require("assets/discover/CommentProfPic4.png"),
        username: "You",
        content: myComment,
        timeAgo: "Just now",
        numLikes: 0,
      },
      ...comments,
    ]);
  }

  return (
    <View className="w-full h-full bg-[#181A1C] relative">
      <Stack.Screen
        options={{
          headerTitle: "Post",
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

      {/* spacer */}
      <View style={{ height: 0 }}></View>

      {/* Post */}
      <Post
        addLinks={false}
        defaultIndex={contentIndex}
        {...postData[postIndex]}
      />

      {/* spacer */}
      <View style={{ height: 8 }}></View>

      {/* some words kus why not lol */}
      <View className="flex flex-row justify-between mx-[5%] items-center">
        <Text
          style={{ fontFamily: "Poppins_300Light", fontSize: 13 }}
          className="text-[#ECEBED]"
        >
          Comments (45)
        </Text>

        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Poppins_500Medium", fontSize: 13 }}
            className="text-[#ECEBED]"
          >
            Recent
          </Text>
          <View className="w-2" />
          <Entypo name="chevron-down" size={20} color="#ECEBED" />
        </View>
      </View>

      {/* spacer */}
      <View style={{ height: 5 }}></View>

      {/* Comments */}
      <View className="w-full h-[20%]">
        <FlashList
          data={comments}
          keyExtractor={(item, index) =>
            item.username.toString() +
            item.content.toString() +
            index.toString()
          }
          showsVerticalScrollIndicator={false}
          estimatedItemSize={comments.length}
          renderItem={({ item }) => <Comment {...item} />}
        />
      </View>

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
            onFocus={() =>
              (translateY.value = withTiming(-307, {
                duration: 450,
                easing: Easing.bezier(0.56, 0.89, 0.18, 0.99),
                reduceMotion: ReduceMotion.System,
              }))
            }
            onSubmitEditing={() => {
              translateY.value = withTiming(0);
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
    </View>
  );
}
