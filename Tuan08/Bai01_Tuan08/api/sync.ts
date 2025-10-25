import axios from 'axios';
import { Task } from '../database/db';

const API_URL = 'https://68fc6f4e96f6ff19b9f51717.mockapi.io/tasks';

// ✅ Lấy task từ cloud
export const fetchTasksFromCloud = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    // MockAPI trả id là string => ép lại number
    return response.data.map((t: any) => ({
      id: Number(t.id),
      title: t.title,
      completed: Number(t.completed),
    }));
  } catch (error: any) {
    console.error('❌ Fetch cloud failed:', error.message);
    return [];
  }
};

// ✅ Đồng bộ từ local lên cloud (gửi từng task)
export const syncTasksToCloud = async (tasks: Task[]) => {
  try {
    for (const task of tasks) {
      await axios.post(API_URL, {
        title: task.title,
        completed: task.completed,
      });
    }
    console.log('✅ Synced all tasks to cloud');
  } catch (error: any) {
    console.error('❌ Sync failed:', error.message);
  }
};

// ✅ Thêm task lên cloud (gọi khi addTask xong)
export const addTaskToCloud = async (title: string) => {
  try {
    await axios.post(API_URL, { title, completed: 0 });
    console.log('✅ Task added to cloud');
  } catch (error: any) {
    console.error('❌ Add to cloud failed:', error.message);
  }
};
