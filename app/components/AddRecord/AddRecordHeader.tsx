import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import CustomCalendar from "./CustomCalendar";
import Svg, { Path } from "react-native-svg";

export default function AddRecordHeader() {

  const today = new Date().toISOString().split("T")[0];;
  
  
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [open, setOpen] = useState(false);

  function toDateString (date : string) : string {
    return new Date(date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
  }


  return (
    <View style={styles.container}>
        <Pressable>
            <Svg fill="none" viewBox="0 0 24 24" id="Close-Fill--Streamline-Rounded-Fill-Material" height="32" width="32">
                <Path fill="white" d="m12 13.0501 -5.25 5.25c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525l5.25 -5.25 -5.25 -5.25c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525c0.15 -0.15 0.325 -0.225 0.525 -0.225s0.375 0.075 0.525 0.225l5.25 5.25 5.25 -5.25c0.15 -0.15 0.325 -0.225 0.525 -0.225s0.375 0.075 0.525 0.225c0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525l-5.25 5.25 5.25 5.25c0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225l-5.25 -5.25Z" strokeWidth="0.5"></Path>
            </Svg>
        </Pressable>

      <Pressable onPress={() => setOpen(true)}>
        <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
                {selectedDate ? toDateString(selectedDate) : toDateString(today) }
                </Text>
            <Svg fill="none" viewBox="0 0 24 24" id="Arrow-Drop-Down-Fill--Streamline-Rounded-Fill-Material" height="24" width="24">
                <Path fill="white" d="m11.6 14.5999 -3.95 -3.925c-0.03335 -0.03335 -0.0625 -0.073 -0.0875 -0.119 -0.025 -0.04615 -0.0375 -0.0955 -0.0375 -0.148 0 -0.10535 0.0344 -0.1955 0.10325 -0.2705 0.06865 -0.075 0.15925 -0.1125 0.27175 -0.1125h8.2c0.1125 0 0.20315 0.03865 0.272 0.116 0.06865 0.07715 0.103 0.16725 0.103 0.27025 0 0.02585 -0.04165 0.11375 -0.125 0.26375l-3.95 3.925c-0.05 0.05 -0.10885 0.09165 -0.1765 0.125 -0.06765 0.03335 -0.14215 0.05 -0.2235 0.05 -0.08115 0 -0.15565 -0.01665 -0.2235 -0.05 -0.06765 -0.03335 -0.1265 -0.075 -0.1765 -0.125Z" strokeWidth="0.5"></Path>
            </Svg>
        </View>
        
      </Pressable>
      <View></View>

      <Modal visible={open} transparent animationType="slide" >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <CustomCalendar today={today} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setOpen={setOpen}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
    
  },
  dateText: {
    fontSize: 18,
    color: "white"
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    backgroundColor: "#141414",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    padding: 5,
  },
  dateContainer: {
    flexDirection: "row"
  }
});