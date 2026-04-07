import React, { createContext, ReactNode, useContext, useState } from "react";

interface HistoryItem {

  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface CalculatorContextType {
  history: HistoryItem[];
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<CalculatorContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (expression: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error("useHistory must be used within a HistoryProvider");
  return context;
};