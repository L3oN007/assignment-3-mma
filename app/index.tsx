import { Image, Text, View } from "react-native";

import images from "@/constants/Images";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import CustomButton from "@/components/global/custom-button";

const Welcome = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <Image
        source={images.artBg}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {/* Bottom Content */}
      <View className="flex-1 justify-end px-4">
        <View className="flex items-start">
          <Text className="mt-7 text-center font-plight text-2xl text-white">
            Discover
          </Text>
          <Text className="text-center font-pregular text-[35px] text-white">
            Your Art Scent
          </Text>
        </View>

        <CustomButton
          title="Let's get started"
          handlePress={() => router.push("/home")}
          containerStyles="w-full mt-7 mb-10"
        />
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default Welcome;
