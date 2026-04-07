import { Href, router, usePathname } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header() {
    const pathname = usePathname();
    
      function changePage(pageString: Href) {
        if (pathname !== pageString) {
          router.push(pageString);
        }
      }
  return (
    <View style={styles.header}>
          <Text style={styles.centered}>Progress Photos</Text>
          <Pressable style={styles.plusContainer} onPress={() => Alert.alert("Clicked!")}>
            <Text style={styles.clickableText}>+</Text>
          </Pressable>
          <View style={styles.buttonContainer}>
            <Pressable>
                <View style={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Photo-Library-Fill--Streamline-Rounded-Fill-Material" height="20" width="20">
                <path fill="#ffffff" d="M8.625 14.575H18.4l-3.175 -4.275 -2.575 3.375L10.95 11.5l-2.325 3.075ZM6.5 19c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V3.5c0 -0.4 0.15 -0.75 0.45 -1.05 0.3 -0.3 0.65 -0.45 1.05 -0.45h14c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v14c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H6.5Zm0 -1.5h14V3.5H6.5v14Zm-3 4.5c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V5h1.5v15.5h15.5v1.5H3.5Zm3 -18.5h14v14H6.5V3.5Z" stroke-width="0.5"></path>
                </svg>
                    <Text style={styles.buttonText}>Open Gallery</Text>
                </View>
            </Pressable>
    
            <Pressable onPress={() => changePage("/comparePage")}>
                <View style={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Compare--Streamline-Rounded-Material" height={20} width={20} ><desc>{"\n    Compare Streamline Icon: https://streamlinehq.com\n  "}</desc><path fill="#ffffff" d="M10.55 21H4.5c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h6.05V1.75c0 -0.2125 0.07235 -0.390665 0.217 -0.5345 0.1445 -0.143665 0.32365 -0.2155 0.5375 -0.2155 0.21365 0 0.39135 0.071835 0.533 0.2155 0.14165 0.143835 0.2125 0.322 0.2125 0.5345v20.5c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575 -0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425V21ZM4.5 18.45h6.05V11.525L4.5 18.45ZM13.55 21V11.625L19.5 18.45V4.5H13.55V3H19.5c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v15c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H13.55Z" strokeWidth={0.5} /></svg>
                    <Text style={styles.buttonText}>Compare Before & After</Text>
                </View>
            </Pressable>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1F1F1F",
    position: "relative", // allow absolute positioning
  },
  centered: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  plusContainer: {
    marginLeft: "auto",
  },
  clickableText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row"
  },
  buttonText: {
    color: "white",
    marginLeft: 5
  }
});