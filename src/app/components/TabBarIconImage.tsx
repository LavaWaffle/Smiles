import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";

const FeedActiveImagePath = require("assets/FeedActive.svg");
const FeedInactiveImagePath = require("assets/FeedInactive.svg");
const DiscoverActiveImagePath = require("assets/DiscoverActive.svg");
const DiscoverInactiveImagePath = require("assets/DiscoverInactive.svg");
const CreateActiveImagePath = require("assets/CreateActive.png");
const CreateInactiveImagePath = require("assets/CreateInactive.png");
const MessagesNfriendsActiveImagePath = require("assets/MessagesNFriendsActive.svg");
const MessagesNfriendsInactiveImagePath = require("assets/MessagesNFriendsInactive.svg");
const CustomizeActiveImagePath = require("assets/create/ProfilePic.png");
const CustomizeInactiveImagePath = require("assets/create/ProfilePic.png");

export enum TabBarIconImageEnum {
  Feed = "Feed",
  Discover = "Discover",
  Create = "Create",
  MessagesNfriends = "MessagesNfriends",
  Customize = "Customize",
}

export const TabBarIconImage = (props: {
  focused: boolean;
  size: number;
  color: string;
  name: TabBarIconImageEnum;
}) => {
  const { focused, size, name } = props;

  return (
    <View
      className={
        name == TabBarIconImageEnum.Customize && focused
          ? "border-2 border-white rounded-full"
          : ""
      }
    >
      <Image
        source={
          name === TabBarIconImageEnum.Feed
            ? focused
              ? FeedActiveImagePath
              : FeedInactiveImagePath
            : name === TabBarIconImageEnum.Discover
            ? focused
              ? DiscoverActiveImagePath
              : DiscoverInactiveImagePath
            : name === TabBarIconImageEnum.Create
            ? focused
              ? CreateActiveImagePath
              : CreateInactiveImagePath
            : name === TabBarIconImageEnum.MessagesNfriends
            ? focused
              ? MessagesNfriendsActiveImagePath
              : MessagesNfriendsInactiveImagePath
            : name === TabBarIconImageEnum.Customize
            ? focused
              ? CustomizeActiveImagePath
              : CustomizeInactiveImagePath
            : null
        }
        style={{ width: size, height: size }}
      />
    </View>
  );
};

// export default TabBarIconImage;
