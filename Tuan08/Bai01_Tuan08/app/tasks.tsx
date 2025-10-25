import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  initDB,
  getTasks,
  toggleTask,
  deleteTask,
  Task,
  addTask,
} from "../database/db";
import { fetchTasksFromCloud, syncTasksToCloud } from "../api/sync";
import { useFocusEffect } from "@react-navigation/native";

export default function TasksScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");

  const loadTasks = async () => {
    await initDB();
    const localData = await getTasks();

    if (localData.length === 0) {
      // Nếu local trống thì lấy từ cloud
      const cloudData = await fetchTasksFromCloud();
      for (const t of cloudData) {
        await addTask(t.title); // lưu về local
      }
      setTasks(cloudData);
    } else {
      setTasks(localData);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleToggle = async (task: Task) => {
    await toggleTask(task.id, !task.completed);
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleSync = async () => {
    await syncTasksToCloud(tasks);
    alert("Tasks synced to cloud!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {name}</Text>
      <Text style={styles.sub}>Have a great day ahead!</Text>

      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={tasks.filter((t) =>
          t.title.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.task, item.completed ? styles.done : null]}
            onPress={() => handleToggle(item)}
            onLongPress={() => handleDelete(item.id)}
          >
            <Text style={styles.taskText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-task")}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
        <Text style={{ color: "#6A0DAD" }}>🔄 Sync to Cloud</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginVertical: 50,
  },
  greeting: { fontSize: 20, fontWeight: "bold" },
  sub: { color: "#777", marginBottom: 10 },
  search: { borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 10 },
  task: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  done: { opacity: 0.5 },
  taskText: { fontSize: 16 },
  addButton: {
    backgroundColor: "#00CFFF",
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  addText: { color: "white", fontSize: 22 },
  syncButton: { marginTop: 20, alignSelf: "center" },
});
