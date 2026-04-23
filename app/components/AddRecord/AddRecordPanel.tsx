import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import AddRecordHeader from './AddRecordHeader'
import { RecordEntry, ViewType } from '@/app/context/RecordProvider'
import Svg, { Path } from 'react-native-svg';
import { pickImageFromLibrary } from '@/app/utils/imagePick';
import AddRecordImageUploader from './AddRecordImageUploader';
import { saveRecordExtern } from '@/app/utils/SaveImagesExtern';


interface Props {
  initialRecord: RecordEntry | undefined;
  setOpen: (record: boolean) => void;
  // updateRecord: (record: RecordEntry) => void;
}

function saveRecord(draft : RecordEntry) {
  saveRecordExtern(draft);

  console.log("Uploading record draft: " + draft)
}

export default function AddRecordPanel({initialRecord, setOpen} : Props) {
  
  const uuid = "f004d522-ea12-4f7e-9731-d03f2043d730" 

  const createEmptyRecord = (): RecordEntry => ({
    id: undefined,
    images: [],
    createdAt: new Date().toISOString(),
    date: new Date().toISOString(),
    userUUID: uuid,
  });

  const [draftRecord, setDraftRecord] = useState<RecordEntry>(() => {
    return initialRecord ?? createEmptyRecord();
  });
  
 


  return (
    <View style={styles.containter}>
        <AddRecordHeader setOpenUpload={setOpen}/>

        <AddRecordImageUploader draftRecord={draftRecord} setDraftRecord={setDraftRecord}/>

        <Pressable onPress={() => saveRecord(draftRecord)}>
          <View style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    justifyContent: "space-between"
  },
  squareContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  square: {
    backgroundColor: "transparent",
    borderRadius: 15,
    width: "15%",
    aspectRatio: 1/1,
  },
  imageSquare: {
    backgroundColor: "transparent",
    borderRadius: 15,
    borderColor: "#080808",
    borderWidth: 2,
    aspectRatio: 1/1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden"

  },
  imageText :{
    color: "white",
    alignSelf: "center",
    marginBottom: 5
  },
  image: {
    width: "100%",
    aspectRatio: 1/1,
  },
  saveButton: {
    backgroundColor: "white",
    width: "95%",
    margin: 20,
    alignSelf: "center",
    borderRadius: 15,
    padding: 25
  },
  saveText: {
    color: "black",
    alignSelf: "center"
  }
})