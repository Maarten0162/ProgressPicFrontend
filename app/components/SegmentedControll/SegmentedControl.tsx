import { ViewType } from "@/app/context/RecordProvider";
import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";

const options = ["FRONT", "SIDE", "BACK"] as ViewType[];;
const WIDTH = 300; // total width of the control

type Props = {
  onSwitchView: (type: ViewType) => void; // function type
};

export default function SegmentedControl({ onSwitchView }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const segmentWidth = WIDTH / options.length;

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    onSwitchView(options[index])

    Animated.timing(translateX, {
      toValue: index * segmentWidth,
      useNativeDriver: true,
      duration: 250,
    }).start();

  };

  return (
    <View style={[styles.container, { width: WIDTH }]}>
      
      {/* Sliding indicator */}
      <Animated.View
        style={[
          styles.slider,
          {
            width: segmentWidth,
            transform: [{ translateX }],
          },
        ]}
      />

      {/* Buttons */}
      {options.map((option, index) => (
        <Pressable
          key={option}
          style={styles.segment}
          onPress={() => handlePress(index)}
        >
          <Text
            style={[
              styles.text,
              selectedIndex === index && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2A2A2A",
    borderRadius: 25,
    overflow: "hidden",
  },

  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    zIndex: 1,
  },

  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: "lightgray",
    borderRadius: 25,
  },

  text: {
    color: "#ffffff",
    fontWeight: "600",
  },

  selectedText: {
    color: "#000",
    fontWeight: "700",
  },
});