import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { addTask } from "../database/db";
import { router } from "expo-router";
import { addTaskToCloud } from "../api/sync";

export default function AddTask() {
  const [title, setTitle] = useState<string>("");

  const handleAdd = async () => {
    if (!title.trim()) return alert("Please input your job!");
    await addTask(title);
    await addTaskToCloud(title);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD YOUR JOB</Text>
      <TextInput
        placeholder="Input your job"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.btnText}>FINISH →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", borderWidth: 1, borderRadius: 8, padding: 10 },
  button: {
    backgroundColor: "#00CFFF",
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
