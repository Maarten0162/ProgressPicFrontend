import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Svg, Path} from 'react-native-svg'

export default function AddRecordHeader() {
  return (
    <View style={styles.Container}>
        <Svg  fill="none" viewBox="0 0 24 24" id="Close-Fill--Streamline-Rounded-Fill-Material" height="24" width="24">
            <Path fill="currentColor" d="m12 13.0501 -5.25 5.25c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525l5.25 -5.25 -5.25 -5.25c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525c0.15 -0.15 0.325 -0.225 0.525 -0.225s0.375 0.075 0.525 0.225l5.25 5.25 5.25 -5.25c0.15 -0.15 0.325 -0.225 0.525 -0.225s0.375 0.075 0.525 0.225c0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525l-5.25 5.25 5.25 5.25c0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225l-5.25 -5.25Z" stroke-width="0.5"></Path>
        </Svg>

        <View style={styles.textContainer}>
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textContainer: {
        flexDirection: "column",

    }
})