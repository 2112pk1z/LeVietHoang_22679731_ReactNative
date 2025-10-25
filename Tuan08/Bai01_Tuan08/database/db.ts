import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

export type Task = {
  id: number;
  title: string;
  completed: number;
};

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);
};

export const getTasks = async (): Promise<Task[]> => {
  const result = await db.getAllAsync<Task>('SELECT * FROM tasks');
  return result;
};

export const addTask = async (title: string) => {
  await db.runAsync('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, 0]);
};

export const toggleTask = async (id: number, completed: boolean) => {
  await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
};

export const deleteTask = async (id: number) => {
  await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
};
