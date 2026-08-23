import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordsProvider } from "./context/RecordProvider";
import React from "react";
import { AuthProvider } from "./context/AuthProvider";


export default function RootLayout() {
  return (
    <AuthProvider>
      <RecordsProvider>
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
          <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#141414" } }} />
          </View>
        </SafeAreaView>
      </RecordsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#141414",
  },
  container: {
    flex: 1
  },
});