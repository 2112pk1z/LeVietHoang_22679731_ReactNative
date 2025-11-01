import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useFocusEffect } from "expo-router";

export default function TrashScreen() {
  const { getDeletedExpenses } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            createdAt={item.createdAt}
            type={item.type}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Không có dữ liệu</Text>}
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
