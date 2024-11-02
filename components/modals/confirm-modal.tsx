import React from "react";

import { Modal, Pressable, Text, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  description,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel} // Handle closing the modal when back button is pressed
    >
      <View className="flex h-full items-center justify-center bg-black/40 bg-opacity-50 px-10">
        <View className="rounded-lg bg-white px-4 py-6">
          <Text className="font-psemibold text-xl">Are you sure ?</Text>
          <Text
            className="my-4 font-pregular text-gray-400"
            style={{ fontSize: 12 }}
          >
            This action cannot be undone. {description}
          </Text>
          <View className="flex flex-row justify-end">
            <Pressable
              className="rounded-md border border-gray-100 bg-white px-4 py-2"
              onPress={onCancel}
            >
              <Text className="text-black">Cancel</Text>
            </Pressable>
            <Pressable
              className="ml-2 rounded-md bg-red-500 px-4 py-2"
              onPress={onConfirm}
            >
              <Text className="text-white">Yes, Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

