import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
  type?: "primary" | "secondary";
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const FilterButton = ({
  type = "primary",
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) => {
  switch (type) {
    case "primary":
      return (
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          className={`flex min-h-[62px] flex-row items-center justify-center rounded-xl bg-primary ${containerStyles} ${
            isLoading ? "opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          <Text className={`font-psemibold text-lg text-white ${textStyles}`}>
            {title}
          </Text>

          {isLoading && (
            <ActivityIndicator
              animating={isLoading}
              color="#fff"
              size="small"
              className="ml-2"
            />
          )}
        </TouchableOpacity>
      );

    case "secondary":
      return (
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          className={`flex flex-row items-center justify-center whitespace-nowrap rounded-full bg-blue-100 px-2 py-1.5 ${containerStyles} ${
            isLoading ? "opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          <Text
            className={`font-psemibold text-lg text-blue-600 ${textStyles}`}
          >
            {title}
          </Text>

          {isLoading && (
            <ActivityIndicator
              animating={isLoading}
              color="#fff"
              size="small"
              className="ml-2"
            />
          )}
        </TouchableOpacity>
      );
  }
};

export default FilterButton;
