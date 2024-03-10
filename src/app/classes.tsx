import { Stack, router } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

export default function Classes() {
  return (
    <View className="bg-[#181A1C] h-full">
      <Stack.Screen
        options={{
          headerTitle: "Classes",
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

      <View className="h-5" />

      <FlashList
        data={classes}
        keyExtractor={(item, index) => item.classText.toString()}
        estimatedItemSize={65}
        renderItem={({ item }) => <Class {...item} />}
      />
    </View>
  );
}

type ClassProps = {
  pic: NodeRequire;
  classText: string;
  grade: string;
};

var classes: ClassProps[] = [
  {
    pic: require("assets/classes/Ruler.png"),
    classText: "AP Calculus BC",
    grade: "A",
  },
  {
    pic: require("assets/classes/Chem.png"),
    classText: "AP Chemistry",
    grade: "Hidden",
  },
  {
    pic: require("assets/classes/Books.png"),
    classText: "AP Language",
    grade: "A-",
  },
  {
    pic: require("assets/classes/Run.png"),
    classText: "Health & Fitness",
    grade: "A+",
  },
];

function Class(props: ClassProps) {
  const { pic, classText, grade } = props;

  return (
    <View className="flex flex-row w-[90%] mx-auto mb-7">
      <Image
        source={pic as unknown as string}
        style={{
          width: 50,
          height: 50,
        }}
      />
      {/* spacer */}
      <View className="w-5" />

      <View className="flex flex-col">
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: 15,
            color: "#FFFFFF",
          }}
        >
          {classText}
        </Text>
        <View className="h-1" />
        {grade != "Hidden" && (
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 13,
              color: "#C4C4C4",
            }}
          >
            {grade}
          </Text>
        )}
      </View>
    </View>
  );
}
