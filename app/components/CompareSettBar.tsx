import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Svg, { Rect, Path } from "react-native-svg";

type Props = {
    Multiview : boolean;
    toggleMultiview: (value: boolean) => void;

};

export default function CompareSettBar({ Multiview, toggleMultiview} : Props) {
    
  return (
    <View style={styles.container}>
        <Pressable>
            <Svg fill="none" viewBox="0 0 24 24" id="Arrow-Back-Ios-Fill--Streamline-Rounded-Fill-Material" height="24" width="24">
                <Path fill="#ffffff" d="m2.825 12.0001 7.875 7.875c0.18335 0.18335 0.275 0.4125 0.275 0.6875s-0.09165 0.5125 -0.275 0.7125c-0.2 0.2 -0.4375 0.3 -0.7125 0.3s-0.5125 -0.1 -0.7125 -0.3L1.05 13.0501c-0.15 -0.15 -0.258335 -0.31665 -0.325 -0.5 -0.066665 -0.1833 -0.1 -0.36665 -0.1 -0.55 0 -0.1833 0.033335 -0.36665 0.1 -0.55 0.066665 -0.1833 0.175 -0.35 0.325 -0.5L9.3 2.70011c0.2 -0.2 0.43335 -0.295835 0.7 -0.2875 0.26665 0.008335 0.5 0.1125 0.7 0.3125 0.18335 0.2 0.27915 0.433335 0.2875 0.7 0.00835 0.266665 -0.0875 0.5 -0.2875 0.7L2.825 12.0001Z" strokeWidth="0.5"></Path>
            </Svg>
        </Pressable>

        <Pressable onPress={() => toggleMultiview(!Multiview)}>
            <View style={styles.multipleToggle}>
                {Multiview ? (
                    <Svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                        <Rect
                            x="4"
                            y="3"
                            width="16"
                            height="18"
                            rx="2"
                            fill="#ffffff"
                        />
                    </Svg>

                    ) : (

                    <Svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                    <Rect
                        x="4"
                        y="3"
                        width="16"
                        height="7"
                        rx="2"
                        fill="#ffffff"
                    />

                    <Rect
                        x="4"
                        y="14"
                        width="16"
                        height="7"
                        rx="2"
                        fill="#ffffff"
                    />
                    </Svg>
                    )}
                </View>
                </Pressable>
        

        <Pressable>
            <Svg fill="none" viewBox="0 0 24 24" id="Arrow-Forward-Ios-Fill--Streamline-Rounded-Fill-Material" height="24" width="24">
                <Path fill="#ffffff" d="M14.775 11.95 6.9 4.075c-0.18335 -0.183335 -0.275 -0.4125 -0.275 -0.6875s0.09165 -0.5125 0.275 -0.7125c0.2 -0.2 0.4375 -0.3 0.7125 -0.3s0.5125 0.1 0.7125 0.3L16.55 10.9c0.15 0.15 0.25835 0.31665 0.325 0.5 0.06665 0.18335 0.1 0.36665 0.1 0.55 0 0.18335 -0.03335 0.36665 -0.1 0.55 -0.06665 0.18335 -0.175 0.35 -0.325 0.5L8.3 21.25c-0.2 0.2 -0.43335 0.29585 -0.7 0.2875 -0.26665 -0.00835 -0.5 -0.1125 -0.7 -0.3125 -0.18335 -0.2 -0.27915 -0.43335 -0.2875 -0.7 -0.00835 -0.26665 0.0875 -0.5 0.2875 -0.7L14.775 11.95Z" strokeWidth="0.5"></Path>
            </Svg>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 50,
    },
    multipleToggle: {
        borderRadius: 100,
        backgroundColor: "#333333",
        padding: 10
    }
})
