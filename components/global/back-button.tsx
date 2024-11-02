import React from "react";

import { TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="h-8 w-8 items-center justify-center rounded-full bg-black/40 pl-2"
    >
      <Icon name="arrow-back-ios" size={20} color="#fff" />
    </TouchableOpacity>
  );
}

export default BackButton;

