import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  View,
  Keyboard,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Feather, Entypo } from "@expo/vector-icons";
import Animated, {
  ReduceMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

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
    <View className="m-[15px] flex flex-row items-center justify-center">
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

function Chip(props: { text: string; clicked: boolean; onClick: any }) {
  const { text, clicked, onClick } = props;
  return (
    <View className="rounded-lg ">
      <Text
        style={{ fontFamily: "Poppins_600SemiBold" }}
        className={`p-2 rounded-lg text-[#ECEBED] text-[12px] border-2 ${
          clicked
            ? "bg-[#2E8AF6] border-[#2E8AF6]"
            : "border-[#727477] bg-transparent"
        } `}
      >
        {text}
      </Text>
    </View>
  );
}

const chipData = ["All", "Robotics", "FBLA", "Sports", "HOSA", "DECA"];

const discover = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <SafeAreaView>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {/* Chips */}
      <View className="space-x-2">
        <FlashList
          data={chipData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={chipData.length}
          renderItem={({ item }) => (
            <Chip
              text={item}
              clicked={false}
              onClick={() => {
                console.log(item);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default discover;
