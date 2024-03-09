import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  View,
  Keyboard,
  Text,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import Animated, {
  ReduceMotion,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

import Carousel from "react-native-reanimated-carousel";
import { AVPlaybackSource, Video } from "expo-av";

// Animated.addWhitelistedUIProps({ className: true, style: true });

const animatedSettings = {
  duration: 750,
  dampingRatio: 1,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
  reduceMotion: ReduceMotion.System,
};

function SearchBar(props: {
  searchPhrase: string;
  setSearchPhrase: any;
  clicked: boolean;
  setClicked: any;
}) {
  const { searchPhrase, setSearchPhrase, clicked, setClicked } = props;

  // get the width of the screen
  const screenWidth = Dimensions.get("window").width;
  const bigWidth = 0.9 * (screenWidth - 30);
  const smallWidth = 0.75 * (screenWidth - 30);
  const SearchBarWidth = useSharedValue(bigWidth);
  const cancelWidth = useSharedValue(0);
  const featherWidth = useSharedValue(30);
  const entypoWidth = useSharedValue(0);

  useEffect(() => {
    SearchBarWidth.value = withSpring(
      clicked ? smallWidth : bigWidth,
      animatedSettings
    );
    cancelWidth.value = withSpring(clicked ? 80 : 0, animatedSettings);
    featherWidth.value = withSpring(clicked ? 0 : 30, {
      stiffness: 1,
      duration: 2000,
      ...animatedSettings,
    });
    entypoWidth.value = withSpring(clicked ? 30 : 0, animatedSettings);
  }, [clicked]);

  return (
    <View className="m-[15px] flex flex-row items-center justify-center grow-0">
      <Animated.View
        style={{
          width: SearchBarWidth,
        }}
        className={
          clicked
            ? "p-[10px] flex flex-row bg-[#323436] rounded-[50%] items-center justify-evenly"
            : "p-[10px] flex flex-row bg-[#323436] rounded-[50%] items-center"
        }
      >
        <Animated.View
          style={{
            width: featherWidth,
            overflow: "hidden",
          }}
        >
          <Feather
            name="search"
            size={25}
            color="#727477"
            style={{ paddingLeft: 4, marginRight: 4 }}
          />
        </Animated.View>
        <TextInput
          className="text-[15px] ml-[10px] w-[90%] text-[#ECEBED]"
          placeholder="Search"
          placeholderTextColor="#A2A2A2"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
          onFocus={() => setClicked(true)}
        />

        <Animated.View
          style={{
            width: entypoWidth,
            overflow: "hidden",
          }}
        >
          <Entypo
            name="cross"
            size={25}
            color="#727477"
            className="focus:bg-transparent active:text-white"
            style={{ padding: 0, marginRight: 4 }}
            suppressHighlighting={true}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          width: cancelWidth,
          overflow: "hidden",
        }}
      >
        <Pressable
          className="overflow-hidden h-[18px]"
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
            }}
            className="text-blue-500 text-[17px] ml-2"
          >
            Cancel
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function Chip(props: {
  text: string;
  clicked: boolean;
  onClick: any;
  first: boolean;
}) {
  const { text, clicked, onClick, first } = props;
  return (
    <Pressable
      className={`rounded-lg mx-2 ${first ? "ml-4" : ""}`}
      onPress={onClick}
    >
      <Text
        style={{
          fontFamily: clicked ? "Poppins_600SemiBold" : "Poppins_400Regular",
        }}
        className={`py-1 px-3 rounded-[15%] text-[#ECEBED] text-[12px] overflow-hidden border-2 ${
          clicked
            ? "bg-[#2E8AF6] border-[#2E8AF6]"
            : "border-[#727477] bg-transparent"
        } `}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const chipData = ["All", "Robotics", "FBLA", "Sports", "HOSA", "DECA"];

type post = {
  author: string;
  timeAgo: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  profilePic: NodeRequire;
  content: [boolean, NodeRequire][];
};

const postData: post[] = [
  {
    author: "Michelle Ogilvy",
    timeAgo: "1h ago",
    description: "Here’s my figurine work for my art class!",
    likes: "18.6k",
    comments: "4.7k",
    shares: "12.4k",
    profilePic: require("assets/discover/ProfilePic1.png"),
    content: [
      [false, require("assets/discover/ArtContent1.png")],
      [false, require("assets/discover/ArtContent2.png")],
      [true, require("assets/discover/ArtVideo.mp4")], // "https://youtu.be/ETd5izCJMik",
    ],
  },
];

const AniFeather = Animated.createAnimatedComponent(Feather);
const AniAntDesign = Animated.createAnimatedComponent(AntDesign);
const AniEntypo = Animated.createAnimatedComponent(Entypo);

function Post(props: post) {
  const {
    author,
    timeAgo,
    description,
    likes,
    comments,
    shares,
    profilePic,
    content,
  } = props;

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
    <View className="w-[90%] mx-auto">
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

      {/* Carosel */}
      <Carousel
        vertical={false}
        width={327}
        height={180}
        loop={true}
        data={content}
        renderItem={({ item }) => {
          return item[0] ? (
            <Video
              source={item[1] as unknown as AVPlaybackSource}
              shouldPlay={true}
              style={{ width: 287, height: 180 }}
              onError={(e) => {
                console.log(e);
              }}
            />
          ) : (
            <Image
              source={item[1] as unknown as string}
              style={{ width: 287, height: 180 }}
            />
          );
        }}
        onSnapToItem={(index) => {
          // console.log(index);
          setIndex(index);
        }}
      />

      {/* spacer */}
      <View className="h-3" />

      {/* Dots representing index */}
      {content.length > 1 && (
        <View className="flex flex-row justify-center">
          {content.map((_, i) => {
            useEffect(() => {
              if (i === index) {
                // console.log("index changed");
                progress.value = withTiming(0, {
                  duration: 750,
                });
              } else {
                progress.value = withTiming(1, {
                  duration: 750,
                });
              }
            }, [index]);
            const progress = useSharedValue(0);
            const animatedStyle = useAnimatedStyle(() => {
              return {
                backgroundColor: interpolateColor(
                  progress.value,
                  [0, 1],
                  ["#F62E8E", "#727477"]
                ),
              };
            });
            return (
              <Animated.View
                key={i}
                className={`w-2 h-2 rounded-[50%] mx-1
                }`}
                style={animatedStyle}
              />
            );
          })}
        </View>
      )}

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

          <Pressable className="flex flex-row ml-4">
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

          <Pressable
            className="flex flex-row ml-4"
            onPress={() => {
              shareSharedValue.value = withTiming(
                shareSharedValue.value ? 0 : 1,
                { duration: 250 }
              );
            }}
          >
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
    </View>
  );
}

const discover = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedChip, setSelectedChip] = useState("All");

  useEffect(() => {
    // console.log(selectedChip);
    // console.log(clicked);
    // console.log(searchPhrase);
    setClicked(false);
  }, [selectedChip]);

  return (
    <SafeAreaView className="flex flex-col h-full bg-green-500 border-10 border-blue-500">
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {/* Chips */}
      <View className="mt-1 grow-0">
        <FlatList
          data={chipData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // estimatedItemSize={chipData.length}
          renderItem={({ item, index }) => (
            <Chip
              text={item}
              first={index === 0}
              clicked={selectedChip == item}
              onClick={() => {
                // console.log(item);
                setSelectedChip(item);
              }}
            />
          )}
        />
      </View>

      {/* spacer */}
      <View className="h-8 grow-0" />

      {/* Posts */}
      <View className="w-full h-full">
        <FlashList
          data={postData}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          estimatedItemSize={postData.length}
          renderItem={({ item }) => <Post {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default discover;
