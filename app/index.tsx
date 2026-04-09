import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet, Button, ScrollView } from 'react-native';
import Header from './components/header';
import ListItem from './components/ListItem';
import ListContainer from './components/ListContainer';
import { useRecords } from './hooks/useRecords';
import { RecordEntry } from './context/RecordProvider';

export default function Index() {

    const { records, addRecord } = useRecords();

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
        <Header/>
        <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(groupedRecords).map(([key, recordsInMonth]) => {
                const [year, month] = key.split("-");
                const date = new Date(Number(year), Number(month));

                return (
                    <ListContainer date={date} key={key}>
                    {recordsInMonth.map(record =>
                        <ListItem record={record} key={record.id} />
                        
                    )}
                    </ListContainer>
                );
                })}
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    Container: {
        padding: 20
    }
})
