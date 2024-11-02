import React, { useEffect, useState } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { useFavoriteStore } from "@/stores/favoriteStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

import { IProduct } from "@/types/product.interface";

import BackButton from "@/components/global/back-button";
import HomeButton from "@/components/global/home-button";
import ParallaxScrollView from "@/components/global/parallax-scroll-view";
import Spinner from "@/components/global/spinner";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { favorites, addFavorite, removeFavorite, isInFavoriteList } =
    useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavoriteList(id as string));
  }, [favorites, id, isFavorite]);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get<IProduct>(
        `https://648867740e2469c038fda6cc.mockapi.io/api/v1/products/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !product) {
    return <Text>Error</Text>;
  }

  const {
    artName,
    price,
    description,
    glassSurface,
    image,
    brand,
    limitedTimeDeal,
    feedbacks,
  } = product;

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(product.id);
      setIsFavorite(false);
    } else {
      addFavorite(product);
      setIsFavorite(true);
    }
  };

  const isLimitTimeDeal = limitedTimeDeal !== 0;
  const newPrice = isLimitTimeDeal ? price * (1 - limitedTimeDeal) : price;
  const discountPercentage = isLimitTimeDeal
    ? Math.round(product.limitedTimeDeal * 100)
    : 0;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "#D0D0D0", light: "#353636" }}
      headerImage={
        <Image
          source={{
            uri: image,
          }}
          className="h-72 w-full rounded-lg bg-white"
        />
      }
    >
      <View className="flex-row items-center justify-between">
        <BackButton />
        <HomeButton />
      </View>
      <View>
        <Text className="text-gray-700">{brand}</Text>
        <Text className="font-pbold text-2xl text-black">{artName}</Text>
      </View>

      <View className="flex-row justify-between border-b border-gray-100 pb-4">
        {isLimitTimeDeal && (
          <View className="flex-row items-center">
            {/* <Text
              className="text-2xl text-gray-700"
              style={[{ textDecorationLine: "line-through", color: "#888" }]}
            >
              ${price}
            </Text> */}
            <Text className="font-psemibold text-2xl text-gray-700">
              ${newPrice.toFixed(2)}
            </Text>
            {discountPercentage > 0 && (
              <View className="mx-2 rounded-md bg-pink-100 px-2.5 py-0.5">
                <Text className="text-xs font-medium text-pink-800">
                  - {discountPercentage}% Off
                </Text>
              </View>
            )}
          </View>
        )}
        {!isLimitTimeDeal && (
          <Text className="font-psemibold text-2xl text-gray-700">
            ${price}
          </Text>
        )}
        <View className="-bottom-2 right-1">
          <TouchableOpacity
            className=""
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              size={26}
              name={isFavorite ? "heart" : "heart-outline"}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description */}
      <View>
        <Text className="font-psemibold text-lg text-gray-700">
          Description
        </Text>
        <Text className="mt-2 text-gray-400">{description}</Text>

        <View className="mt-2">
          {glassSurface && (
            <View className="w-44 items-center rounded-md bg-indigo-100 px-2.5 py-0.5">
              <Text className="text-xs font-medium text-indigo-800">
                Glass Surface Available
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Feedbacks */}
      <View className="mt-4">
        <Text className="font-psemibold text-lg text-gray-700">
          Reviews ({feedbacks.length})
        </Text>

        {feedbacks.map((feedback) => (
          <View
            className="mt-4 flex-col border-b border-gray-400 pb-4"
            key={feedback.username}
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-psemibold text-lg">
                {feedback.username}
              </Text>
              <Text className="text-sm text-gray-500">{feedback.rating} ★</Text>
            </View>
            <Text className="text-sm text-gray-500">{feedback.feedback}</Text>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}
