import React, { useState, useCallback } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import { useDatabase } from "../hooks/useDatabase";
import { useFocusEffect } from "expo-router";
import ExpenseItem from "../components/ExpenseItem";

export default function TrashScreen() {
  const { getDeletedExpenses } = useDatabase();
  const [data, setData] = useState<any[]>([]);

  const loadData = async () => {
    const items = await getDeletedExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🗑️ Các khoản đã xóa</Text>
      <FlatList
        data={data}
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    paddingTop: 40,
  },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
