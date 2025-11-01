import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDatabase } from "../hooks/useDatabase";

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams(); // ✅ lấy id từ router
  const { getExpenseById, updateExpense } = useDatabase(); // ✅ dùng API mới
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Chi");
  const router = useRouter();

  // ✅ Lấy dữ liệu hiện tại từ SQLite bằng getExpenseById
  useEffect(() => {
    if (!id) return;

    const loadExpense = async () => {
      const data = await getExpenseById(Number(id));
      if (data) {
        setTitle(data.title);
        setAmount(String(data.amount));
        setType(data.type);
      } else {
        Alert.alert("Lỗi", "Không tìm thấy dữ liệu cần sửa.");
        router.back();
      }
    };

    loadExpense();
  }, [id]);

  // ✅ Xử lý lưu cập nhật
  const handleSave = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    await updateExpense(Number(id), title, parseFloat(amount), type);
    Alert.alert("Thành công", "Đã cập nhật khoản chi!");
    router.back(); // quay lại màn hình chính
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sửa Khoản Thu / Chi</Text>

      <TextInput
        placeholder="Tên khoản chi"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Số tiền"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />

      <TextInput
        placeholder="Loại (Thu / Chi)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <Button title="Lưu thay đổi" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});
