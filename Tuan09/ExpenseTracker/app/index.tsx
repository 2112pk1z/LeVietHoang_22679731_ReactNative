import React, { useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Pressable,
  Alert,
  View,
  TextInput,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { getExpenses, deleteExpense } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // ✅ Hàm tải dữ liệu
  const loadData = async () => {
    const items = await getExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // ✅ Lọc dữ liệu theo ô tìm kiếm
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Xử lý xóa (đưa vào thùng rác)
  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa khoản này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteExpense(id);
          loadData();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      {/* Nút thêm mới */}
      <View style={{ marginBottom: 10 }}>
        <Button title="Add" onPress={() => router.push("/modal")} />
      </View>

      {/* Nút đi tới thùng rác */}
      <Button title="Thùng rác" onPress={() => router.push("/trash")} />

      {/* Ô tìm kiếm */}
      <View style={{ marginTop: 10 }}>
        <TextInput
          placeholder="Tìm kiếm khoản thu/chi..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Danh sách thu chi */}
      <FlatList
        data={filteredData} // ✅ Sửa lại chỗ này
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: "/edit", params: { id: item.id } })
            }
            onLongPress={() => handleDelete(item.id)}
          >
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              createdAt={item.createdAt}
              type={item.type}
            />
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có dữ liệu</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    paddingTop: 40,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
