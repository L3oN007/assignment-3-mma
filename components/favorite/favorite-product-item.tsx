import React from "react";

import { Image, Pressable, Text, View } from "react-native";

import { router } from "expo-router";

import { IProduct } from "@/types/product.interface";

import { calculateAverageRating } from "@/lib/utils";

type Props = {
  product: IProduct;
};

export default function FavoriteProductItem({ product }: Props) {
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

  const avgRating = calculateAverageRating(product.feedbacks);
  const isLimitTimeDeal = product.limitedTimeDeal !== 0;
  const newPrice = isLimitTimeDeal
    ? product.price * (1 - product.limitedTimeDeal)
    : product.price;
  const discountPercentage = isLimitTimeDeal
    ? Math.round(product.limitedTimeDeal * 100)
    : 0;
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="mb-2 flex-row rounded-xl border border-gray-100 bg-white p-2"
    >
      <Image
        source={{ uri: product.image }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
        className="rounded-xl"
      />
      <View className="flex-col justify-between px-2">
        <View>
          <Text className="text-xs">{brand}</Text>
          <Text
            className="flex-row font-psemibold"
            style={{
              width: 270,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {artName}
          </Text>
        </View>

        {/* Price + Rating */}
        <View>
          <View className="flex-row items-end justify-between">
            {isLimitTimeDeal && (
              <View className="flex-col">
                <Text
                  style={[
                    { textDecorationLine: "line-through", color: "#888" },
                  ]}
                >
                  ${product.price}
                </Text>
                <View className="flex-row items-center">
                  <Text className="font-psemibold">${newPrice.toFixed(2)}</Text>
                  {discountPercentage > 0 && (
                    <View className="mx-2 rounded-md bg-pink-100 px-1.5 py-0.5">
                      <Text className="text-xs font-medium text-pink-800">
                        - {discountPercentage}% Off
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            {!isLimitTimeDeal && <Text>${product.price}</Text>}

            <View>
              <Text>
                {avgRating.toFixed(1)} ★ ({product.feedbacks.length})
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

