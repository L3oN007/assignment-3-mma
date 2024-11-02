import React, { useEffect, useState } from "react";

import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFavoriteStore } from "@/stores/favoriteStore";
import Icon from "@expo/vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";

import FavoriteProductItem from "@/components/favorite/favorite-product-item";
import ConfirmModal from "@/components/modals/confirm-modal";

export default function Favorites() {
  const { favorites, loadFavorites, removeAllFavorites, removeFavorite } =
    useFavoriteStore();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalRemoveAllVisible, setModalRemoveAllVisible] = useState(false);
  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setModalVisible(false);
  };

  const handleRemoveAll = () => {
    removeAllFavorites();
    setModalRemoveAllVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="mb-4">
            <Text className="text-gray-500">Favorite Products</Text>
            <Text className="font-psemibold text-3xl">
              {favorites.length} Items
            </Text>
          </View>

          <TouchableOpacity
            className="ml-4 flex-row items-center justify-center rounded-md bg-red-500 px-4 py-2"
            onPress={() => setModalRemoveAllVisible(true)}
          >
            <Icon name="delete" size={20} color="white" />
            <Text className="ml-2 font-bold text-white">Remove All</Text>
          </TouchableOpacity>
          <ConfirmModal
            visible={isModalRemoveAllVisible}
            onConfirm={handleRemoveAll}
            onCancel={() => setModalRemoveAllVisible(false)}
            description="This will remove all items out of your favorite list."
          />
        </View>

        <SwipeListView
          data={favorites}
          renderItem={(item) => <FavoriteProductItem product={item.item} />}
          keyExtractor={(item) => item.id}
          renderHiddenItem={(data) => (
            <View className="h-full items-end pb-2 pt-1">
              <Pressable
                className="h-full w-24 items-center justify-center rounded-r-xl bg-red-500 p-4"
                onPress={() => removeFavorite(data.item.id)}
              >
                <Icon name="delete" size={28} color="white" />
              </Pressable>
            </View>
          )}
          rightOpenValue={-80}
          disableRightSwipe
        />
      </View>
    </SafeAreaView>
  );
}
