import React from 'react'
import { Calendar } from 'react-native-calendars';

interface Props {
  today: string;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  setOpen: (value: boolean) => void;
}

export default function CustomCalendar({today, selectedDate, setSelectedDate, setOpen} : Props) {
        
  return (
    <Calendar
                theme={{
                    calendarBackground: "#141414",
                    textSectionTitleColor: "#ffffff",
                    monthTextColor: '#ffffff',
                    dayTextColor: '#ffffff',
                    todayTextColor: "#ffffff",
                    textDisabledColor: '#555555',
                    arrowColor: "#ffffff",
                    todayDotColor: "red"
                    

                }}
                markingType={'custom'}
                    markedDates={{
                        [today]: {
                            customStyles: {
                                container: {
                                borderWidth: 2,
                                borderColor: "#444444",
                                borderRadius: 100,
                                },
                                text: {
                                color: "white",
                                },
                            },
                        },

                        [selectedDate]: {
                            customStyles: {
                                container: {
                                backgroundColor: "white",
                                },
                                text: {
                                color: "black",
                                },
                            },
                        },

                    }
                }
                initialDate={today}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    setOpen(false);
                }}
                />
  )
}
