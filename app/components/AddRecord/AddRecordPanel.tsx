import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import AddRecordHeader from './AddRecordHeader'
import { RecordEntry } from '@/app/context/RecordProvider'
import AddRecordImageUploader from './AddRecordImageUploader';
import { saveRecordExtern } from '@/app/utils/SaveImagesExtern';


interface Props {
  initialRecord: RecordEntry | undefined;
  setOpen: (record: boolean) => void;
  refreshRecords: () => void;
  
}



export default function AddRecordPanel({initialRecord, setOpen, refreshRecords} : Props) {
 
  const uuid = "f004d522-ea12-4f7e-9731-d03f2043d730"
  const today = new Date().toISOString().split("T")[0];
  
  const [selectedDate, setSelectedDate] = useState<string>(today);
  
  function setDate(date : string) {
    setSelectedDate(date);
    draftRecord.date = date;
  }
  
  
  async function saveRecord(draft: RecordEntry) {
      try {
        await saveRecordExtern(draft);

        console.log("Record uploaded successfully");

        await refreshRecords()
        console.log("refreshed Records successfully");


        // Close the panel after successful upload
        setOpen(false);
      } catch (error) {
        console.error("Failed to upload record:", error);
      }
  }


  const createEmptyRecord = (): RecordEntry => ({
    id: undefined,
    images: [],
    createdAt: new Date().toISOString().split("T")[0],
    date: new Date().toISOString().split("T")[0],
    userUUID: uuid,
  });

  const [draftRecord, setDraftRecord] = useState<RecordEntry>(() => {
    return initialRecord ?? createEmptyRecord();
  });
  
 


  return (
    <View style={styles.containter}>
        <AddRecordHeader setSelectedDate={setDate} selectedDate={selectedDate} today={today} setOpenUpload={setOpen}/>

        <AddRecordImageUploader draftRecord={draftRecord} setDraftRecord={setDraftRecord}/>

        <Pressable testID='Save-Record-Button' onPress={() => saveRecord(draftRecord)}>
          <View style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    justifyContent: "space-between",
    
  },
  saveButton: {
    backgroundColor: "white",
    width: "95%",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 15,
    padding: 25
  },
  saveText: {
    color: "black",
    alignSelf: "center"
  }
})