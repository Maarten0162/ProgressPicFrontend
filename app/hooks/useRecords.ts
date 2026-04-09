import { useContext } from "react";
import { RecordsContext, RecordsContextType } from "../context/RecordProvider";

export const useRecords = (): RecordsContextType => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};