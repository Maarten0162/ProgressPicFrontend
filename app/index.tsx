import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import Header from './components/header';
import ListItem from './components/ListItem';
import ListContainer from './components/ListContainer';
import { useRecords } from './hooks/useRecords';
import { RecordEntry } from './context/RecordProvider';
import AddRecordPanel from './components/AddRecord/AddRecordPanel';

export default function Index() {

    const { records, refreshRecords } = useRecords();

    const [open, setOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<RecordEntry | undefined>(undefined);
    
    function toggleAddRecord(open : boolean, record : RecordEntry | undefined) {
        setEditRecord(record);
        setOpen(open);
    }
    
    const groupedRecords = records.reduce((acc, record) => {
        const date = new Date(record.date);

        const key = `${date.getFullYear()}-${date.getMonth()}`;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(record);

        return acc;
    }, {} as Record<string, RecordEntry[]>);

  return (
    <>
        <Header setOpen={toggleAddRecord}/>
        <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(groupedRecords).map(([key, recordsInMonth]) => {
                const [year, month] = key.split("-");
                const date = new Date(Number(year), Number(month));

                return (
                    <ListContainer date={date} key={key}>
                    {recordsInMonth.map(record =>
                        <ListItem setOpen={toggleAddRecord} record={record} key={record.id} />
                        
                    )}
                    </ListContainer>
                );
                })}
        </ScrollView>

        <Modal visible={open} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <AddRecordPanel setOpen={setOpen} refreshRecords={refreshRecords} initialRecord={editRecord} />
                </View>
            </View>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#111",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});
