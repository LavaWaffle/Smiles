import React from "react";
import { Image } from "expo-image";

const FeedActiveImagePath = require("assets/FeedActive.svg");
const FeedInactiveImagePath = require("assets/FeedInactive.svg");
const DiscoverActiveImagePath = require("assets/DiscoverActive.svg");
const DiscoverInactiveImagePath = require("assets/DiscoverInactive.svg");
const CreateActiveImagePath = require("assets/CreateActive.svg");
const CreateInactiveImagePath = require("assets/CreateInactive.svg");
const MessagesNfriendsActiveImagePath = require("assets/MessagesNFriendsActive.svg");
const MessagesNfriendsInactiveImagePath = require("assets/MessagesNFriendsInactive.svg");
const CustomizeActiveImagePath = require("assets/CustomizeActive.svg");
const CustomizeInactiveImagePath = require("assets/CustomizeInactive.svg");

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
  );
};

// export default TabBarIconImage;
