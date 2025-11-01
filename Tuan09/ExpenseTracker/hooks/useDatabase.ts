import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const db = SQLite.openDatabaseSync("expenses.db");

export function useDatabase() {
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
      
          try {
            await db.execAsync(`ALTER TABLE expenses ADD COLUMN isDeleted INTEGER DEFAULT 0;`);
          } catch (error) {
            console.log("Cột isDeleted đã tồn tại hoặc đã được tạo trước đó.");
          }
        })();
      }, []);
      

  const addExpense = async (title: string, amount: number, type: string) => {
    const createdAt = new Date().toISOString().split("T")[0];
    await db.runAsync(
      "INSERT INTO expenses (title, amount, createdAt, type, isDeleted) VALUES (?, ?, ?, ?, 0)",
      [title, amount, createdAt, type]
    );
  };

  const getExpenses = async () => {
    return await db.getAllAsync(
      "SELECT * FROM expenses WHERE isDeleted = 0 ORDER BY id DESC"
    );
  };

  const getDeletedExpenses = async () => {
    return await db.getAllAsync(
      "SELECT * FROM expenses WHERE isDeleted = 1 ORDER BY id DESC"
    );
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

  const deleteExpense = async (id: number) => {
    await db.runAsync("UPDATE expenses SET isDeleted = 1 WHERE id = ?", [id]);
  };

  return {
    addExpense,
    getExpenses,
    getDeletedExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
  };
}
