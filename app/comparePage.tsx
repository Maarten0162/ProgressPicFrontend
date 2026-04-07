import React from 'react'
import { Text, View, StyleSheet, Image, Platform } from 'react-native'
import SegmentedControl from './components/SegmentedControll/SegmentedControl'
import ImageCarousel from './components/ImageCarousel'

export default function comparePage() {
  return (
    <View>
        <View style={styles.HeaderContainer}>
            <SegmentedControl></SegmentedControl>
        </View>

        <View style={styles.imageContainer}>
            <Text style={styles.dateText}>asd</Text>

            <Image source={{ uri: "https://placehold.co/400" }} style={styles.image} />

            <View style={styles.KeyValueTextContainer}>
                <Text style={styles.keyText}>Scale Weight: </Text>
                <Text style={styles.valueText}>90.1 kg</Text>
            </View>

        </View>
        <ImageCarousel>
            
        </ImageCarousel>
    </View>
  )
}
const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  }, 
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: Platform.OS === "web" ? 500 : "80%",
    aspectRatio: 1/1,
    borderRadius: Platform.OS === "web" ? 15 : 45,
    borderColor: "lightgray",
    borderWidth: 4
  },
  dateText : {
    fontSize: 24,
    color: "white",
    marginBottom: 15
  },
  keyText : {
    fontSize: 18,
    color: "white"
  },
  valueText : {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  KeyValueTextContainer : {
    flexDirection: "row",
    marginTop: 20
  }
})