import React from "react";

import { TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

function HomeButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.navigate("/home")}
      className="h-8 w-8 items-center justify-center pl-2"
    >
      <Icon name="home" size={26} color="gray" />
    </TouchableOpacity>
  );
}

export default HomeButton;

