import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const db = SQLite.openDatabaseSync("expenses.db");

export function useDatabase() {
  // 🔧 Tạo bảng nếu chưa có
  useEffect(() => {
    (async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          createdAt TEXT NOT NULL,
          type TEXT NOT NULL
        );
      `);
    })();
  }, []);

  const addExpense = async (title: string, amount: number, type: string) => {
    const createdAt = new Date().toISOString().split("T")[0];
    await db.runAsync(
      "INSERT INTO expenses (title, amount, createdAt, type) VALUES (?, ?, ?, ?)",
      [title, amount, createdAt, type]
    );
  };

  const getExpenses = async () => {
    return await db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC");
  };

  const getExpenseById = async (id: number) => {
    return await db.getFirstAsync("SELECT * FROM expenses WHERE id = ?", [id]);
  };

  const updateExpense = async (
    id: number,
    title: string,
    amount: number,
    type: string
  ) => {
    await db.runAsync(
      "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?",
      [title, amount, type, id]
    );
  };

  return { addExpense, getExpenses, getExpenseById, updateExpense };
}
