import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

let db: SQLite.SQLiteDatabase | null = null;

export function useDatabase() {
  useEffect(() => {
    (async () => {
      if (!db) {
        db = await SQLite.openDatabaseAsync("expenses.db");
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            createdAt TEXT NOT NULL,
            type TEXT NOT NULL,
            isDeleted INTEGER DEFAULT 0
          );
        `);
      }
    })();
  }, []);

  const getDb = async () => {
    if (!db) db = await SQLite.openDatabaseAsync("expenses.db");
    return db;
  };

  const addExpense = async (title: string, amount: number, type: string) => {
    const database = await getDb();
    const createdAt = new Date().toISOString().split("T")[0];
    await database.runAsync(
      "INSERT INTO expenses (title, amount, createdAt, type, isDeleted) VALUES (?, ?, ?, ?, 0)",
      [title, amount, createdAt, type]
    );
  };

  const getExpenses = async () => {
    const database = await getDb();
    return await database.getAllAsync(
      "SELECT * FROM expenses WHERE isDeleted = 0 ORDER BY id DESC"
    );
  };

  const getDeletedExpenses = async () => {
    const database = await getDb();
    return await database.getAllAsync(
      "SELECT * FROM expenses WHERE isDeleted = 1 ORDER BY id DESC"
    );
  };

  const getExpenseById = async (id: number) => {
    const database = await getDb();
    return await database.getFirstAsync("SELECT * FROM expenses WHERE id = ?", [
      id,
    ]);
  };

  const updateExpense = async (
    id: number,
    title: string,
    amount: number,
    type: string
  ) => {
    const database = await getDb();
    await database.runAsync(
      "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?",
      [title, amount, type, id]
    );
  };

  const deleteExpense = async (id: number) => {
    const database = await getDb();
    await database.runAsync(
      "UPDATE expenses SET isDeleted = 1 WHERE id = ?",
      [id]
    );
  };

  const restoreExpense = async (id: number) => {
    const database = await getDb();
    await database.runAsync(
      "UPDATE expenses SET isDeleted = 0 WHERE id = ?",
      [id]
    );
  };

  const getAllExpenses = async () => {
    const database = await getDb();
    return await database.getAllAsync("SELECT * FROM expenses");
  };

  return {
    addExpense,
    getExpenses,
    getDeletedExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    restoreExpense,
    getAllExpenses,
  };
}
