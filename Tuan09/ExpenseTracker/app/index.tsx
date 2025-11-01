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
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { getExpenses, deleteExpense } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  const loadData = async () => {
    const items = await getExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

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

      <View style={{ marginBottom: 10 }}>
        <Button title="Add" onPress={() => router.push("/modal")} />
      </View>

      <Button title="Thùng rác" onPress={() => router.push("/trash")} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: "/edit", params: { id: item.id } })
            }
            onLongPress={() => handleDelete(item.id)} // 👈 Xóa khi nhấn giữ
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
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
