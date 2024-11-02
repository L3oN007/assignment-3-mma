import React from "react";

import { SafeAreaView, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import BackButton from "@/components/global/back-button";
import SearchInput from "@/components/home/search-input";
import SelectBrandList from "@/components/home/select-brand-list";
import SearchProductList from "@/components/search/search-product-list";

function Search() {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white py-4">
      <View className="p-4">
        <View className="mb-4">
          <BackButton />
        </View>

        <View className="mb-4">
          <Text className="font-pmedium text-sm text-gray-400">
            Search Results for
          </Text>
          <Text className="mt-1 font-psemibold text-2xl text-primary">
            {query}
          </Text>
        </View>

        <SearchInput initQuery="" />

        <View className="mt-4">
          <SelectBrandList />
        </View>

        <View className="mt-4">
          <SearchProductList />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Search;
