import { ActivityIndicator, Platform, View } from "react-native";

const Spinner = () => {
  const osName = Platform.OS;

  return (
    <View className="z-10 flex h-full w-full items-center justify-center bg-white">
      <ActivityIndicator
        animating={true}
        color="#176FF2"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Spinner;
