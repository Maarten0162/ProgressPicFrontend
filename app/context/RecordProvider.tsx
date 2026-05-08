import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";



export interface ImageEntity {
  id: number;
  imageId: string;
  imageUrl: string;
  type: ViewType;
  isLocal: boolean;
}

export type ViewType = "FRONT" | "SIDE" | "BACK" ;

export interface RecordEntry {
  id: number | undefined;
  createdAt: string;
  date: string;
  images: ImageEntity[];
  userUUID: string;
}

export interface RecordsContextType {
  records: RecordEntry[];
  addRecord: (record: RecordEntry) => void;
  updateRecord: (record: RecordEntry) => void;
  deleteRecord: (id: number) => void;
  refreshRecords: () => Promise<void>;
}


export const RecordsContext = createContext<RecordsContextType | undefined>(undefined);


//MOCK DATA
// const tempRecords: RecordEntry[] = [
//   {
//     id: 1,
//     createdAt: "2026-04-01T10:00:00Z",
//     date: "2026-04-01",
//     userUUID: "user-1234",
//     images: [
//       { id: 1, imageId: "img-001", imageUrl: "https://picsum.photos/400?random=1", type: "FRONT", isLocal: false },
//       { id: 2, imageId: "img-002", imageUrl: "https://picsum.photos/400?random=2", type: "SIDE", isLocal: false },
//       { id: 3, imageId: "img-003", imageUrl: "https://picsum.photos/400?random=3", type: "BACK", isLocal: false },
//     ],
//   },
//   {
//     id: 2,
//     createdAt: "2026-04-02T11:30:00Z",
//     date: "2026-04-02",
//     userUUID: "user-1234",
//     images: [
//       { id: 4, imageId: "img-004", imageUrl: "https://picsum.photos/400?random=4", type: "FRONT", isLocal: false },
//       { id: 5, imageId: "img-005", imageUrl: "https://picsum.photos/400?random=5", type: "SIDE", isLocal: false },
//     ],
//   },
//   {
//     id: 3,
//     createdAt: "2026-04-03T09:15:00Z",
//     date: "2026-04-03",
//     userUUID: "user-1234",
//     images: [
//       { id: 6, imageId: "img-006", imageUrl: "https://picsum.photos/400?random=6", type: "FRONT", isLocal: false },
//       { id: 7, imageId: "img-007", imageUrl: "https://picsum.photos/400?random=7", type: "BACK", isLocal: false },
//     ],
//   },
//   {
//     id: 4,
//     createdAt: "2026-04-04T14:20:00Z",
//     date: "2026-04-04",
//     userUUID: "user-1234",
//     images: [
//       { id: 8, imageId: "img-008", imageUrl: "https://picsum.photos/400?random=8", type: "FRONT", isLocal: false },
//       { id: 9, imageId: "img-009", imageUrl: "https://picsum.photos/400?random=9", type: "SIDE", isLocal: false },
//       { id: 10, imageId: "img-010", imageUrl: "https://picsum.photos/400?random=10", type: "BACK", isLocal: false },
//     ],
//   },
//   {
//     id: 5,
//     createdAt: "2026-04-05T08:45:00Z",
//     date: "2026-04-05",
//     userUUID: "user-1234",
//     images: [
//       { id: 11, imageId: "img-011", imageUrl: "https://picsum.photos/400?random=11", type: "FRONT", isLocal: false },
//     ],
//   },
//   {
//     id: 6,
//     createdAt: "2026-03-05T08:45:00Z",
//     date: "2026-03-05",
//     userUUID: "user-1234",
//     images: [
//       { id: 12, imageId: "img-012", imageUrl: "https://picsum.photos/400?random=12", type: "FRONT", isLocal: false },
//     ],
//   },
// ];  


export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<RecordEntry[]>([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get<RecordEntry[]>(
        "http://localhost:8080/api/record/f004d522-ea12-4f7e-9731-d03f2043d730"
      );
      setRecords(response.data)
      // setRecords(tempRecords.sort((a, b) => {
      //   // Convert date strings to timestamps
      //   const dateA = new Date(a.date).getTime();
      //   const dateB = new Date(b.date).getTime();

      //   // Descending: latest date first
      //   return dateB - dateA;
      // }));
    } catch (error) {
      console.error("Failed to fetch records", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);


  const addRecord = (record: RecordEntry) => {
    setRecords(prev => [...prev, record]);
  };

  const updateRecord = (record: RecordEntry) => {
    setRecords(prev => prev.map(r => (r.id === record.id ? record : r)));
  };

  const deleteRecord = (id: number) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const value = useMemo(() => ({
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    refreshRecords: fetchRecords,
  }), [records]);

  return (
    <RecordsContext.Provider value={value}>
      {children}
    </RecordsContext.Provider>
  );
};