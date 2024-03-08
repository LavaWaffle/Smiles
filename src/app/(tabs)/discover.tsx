import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { Feather, Entypo } from "@expo/vector-icons";

function SearchBar(props: {
  searchPhrase: string;
  setSearchPhrase: any;
  clicked: boolean;
  setClicked: any;
}) {
  const { searchPhrase, setSearchPhrase, clicked, setClicked } = props;

  return (
    <View className="m-[15px] flex flex-row items-center justify-center">
      <View
        className={
          clicked
            ? "p-[10px] flex flex-row w-[70%] bg-[#323436] rounded-[10%] items-center justify-evenly"
            : "p-[10px] flex flex-row w-[95%] bg-[#323436] rounded-[10%] items-center"
        }
      >
        <Feather
          name="search"
          size={20}
          color="#727477"
          style={{ marginLeft: 4, marginRight: 4 }}
        />
        <TextInput
          className="text-[20px] ml-[10px] w-[90%] text-[#ECEBED]"
          placeholder="Search"
          placeholderTextColor="#A2A2A2"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            className="focus:bg-transparent"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {clicked && (
        <View>
          <Button
            title="cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}

const discover = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  return (
    <SafeAreaView>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
    </SafeAreaView>
  );
};

export default discover;
