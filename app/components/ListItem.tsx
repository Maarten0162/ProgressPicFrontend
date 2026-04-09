import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import Svg, { Rect, Path } from "react-native-svg";


export default function ListItem() {
  return (
    <View style={styles.container}>
      
      <View style={styles.imagesContainer}>
        <Image source={{ uri: "https://picsum.photos/400" }} style={styles.image} />
        <Image source={{ uri: "https://picsum.photos/400" }} style={styles.imageLeft} />
        <Image source={{ uri: "https://picsum.photos/400" }} style={styles.imageLeft} />
      </View>

      {/* Text on the right */}

      <Text style={styles.text}>Sat, 28 Mar</Text>
        <View style={styles.editButton}>
            <Svg fill="none" viewBox="0 0 24 24" id="Edit-Fill--Streamline-Rounded-Fill-Material" height="24" width="24">
              <Path fill="#ffffff" d="M3.75 21.0004c-0.216665 0 -0.395835 -0.07085 -0.5375 -0.2125 -0.141665 -0.1417 -0.2125 -0.32085 -0.2125 -0.5375v-1.825c0 -0.2 0.041665 -0.39585 0.125 -0.5875 0.083335 -0.1917 0.191665 -0.3542 0.325 -0.4875L17.375 3.45039c0.13335 -0.133335 0.29165 -0.2375 0.475 -0.3125 0.18335 -0.075 0.375 -0.1125 0.575 -0.1125 0.18335 0 0.36665 0.0375 0.55 0.1125 0.18335 0.075 0.35 0.179165 0.5 0.3125l1.1 1.1c0.15 0.15 0.25835 0.316665 0.325 0.50001 0.06665 0.1833 0.1 0.36665 0.1 0.55 0 0.1833 -0.0375 0.3708 -0.1125 0.5625 -0.075 0.19165 -0.17915 0.35415 -0.3125 0.4875l-13.925 13.9c-0.13335 0.1333 -0.29585 0.24165 -0.4875 0.325 -0.19165 0.0833 -0.3875 0.125 -0.5875 0.125H3.75Zm14.725 -14.425 1 -1 -1.025 -1.02501 -1 1.00001 1.025 1.025Z" strokeWidth="0.5"></Path>
            </Svg>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // vertical centering
    padding: 16,
  },

  imagesContainer: {
    flexDirection: "row",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#141414",
    borderWidth: 4
  },
  imageLeft: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#141414",
    borderWidth: 4,
    marginLeft: -20
  },

  text: {
    marginLeft: "auto",
    fontSize: 24,
    color: "#A5A5A5",
  },
  editButton: {
    backgroundColor: "#333333",
    borderRadius: 50,
    padding: 8,
    marginLeft: 20
  }
});