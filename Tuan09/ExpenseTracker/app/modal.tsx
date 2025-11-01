import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useDatabase } from "../hooks/useDatabase";

export default function AddExpenseScreen() {
  const { addExpense } = useDatabase();
  const router = useRouter();

  // Dùng state thay cho .value
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const handleSave = async () => {
    if (!title || !amount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await addExpense(title, parseFloat(amount), type);
      Alert.alert("Thành công", "Đã thêm khoản mới!");

      // Clear input
      setTitle("");
      setAmount("");

      // Quay lại màn hình chính
      router.back();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể lưu dữ liệu");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm Khoản Thu/Chi</Text>

      <TextInput
        ref={titleRef}
        placeholder="Tên khoản chi..."
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        ref={amountRef}
        placeholder="Số tiền..."
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Thu" && styles.activeThu]}
          onPress={() => setType("Thu")}
        >
          <Text style={styles.typeText}>Thu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === "Chi" && styles.activeChi]}
          onPress={() => setType("Chi")}
        >
          <Text style={styles.typeText}>Chi</Text>
        </TouchableOpacity>
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  activeThu: { backgroundColor: "#2ecc71" },
  activeChi: { backgroundColor: "#e74c3c" },
  typeText: { color: "#fff", fontWeight: "bold" },
});
