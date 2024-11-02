import React, { useState } from "react";

import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

import icons from "@/constants/Icons";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initQuery }: { initQuery: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initQuery || "");
  return (
    <View className="bg-blue-00 flex h-16 w-full flex-row items-center space-x-4 rounded-2xl border border-gray-100 px-4 focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-base text-black"
        value={query}
        placeholder="Search a product"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        className="rounded-xl bg-primary p-3"
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
