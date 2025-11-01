import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
  TextInput,
  RefreshControl,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useFocusEffect } from "expo-router";

export default function TrashScreen() {
  const { getDeletedExpenses, restoreExpense } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const items = await getDeletedExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Khôi phục item
  const handleRestore = (id: number) => {
    Alert.alert("Khôi phục", "Bạn có muốn khôi phục khoản này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Khôi phục",
        onPress: async () => {
          await restoreExpense(id);
          loadData(); // cập nhật lại danh sách
        },
      },
    ]);
  };

  // ✅ Refresh control
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>THÙNG RÁC</Text>

      <TextInput
        placeholder="Tìm kiếm khoản đã xóa..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onLongPress={() => handleRestore(item.id)}>
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              createdAt={item.createdAt}
              type={item.type}
            />
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Không có dữ liệu</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    marginBottom: 10,
  },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
