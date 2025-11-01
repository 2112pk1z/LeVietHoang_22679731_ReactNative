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
  RefreshControl,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { getExpenses, deleteExpense, getAllExpenses } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [apiLink, setApiLink] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all"); // ✅ bộ lọc
  const [refreshing, setRefreshing] = useState(false);
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

  const filteredData = data.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"
        ? true
        : filter === "income"
        ? item.type === "Thu"
        : item.type === "Chi";
    return matchSearch && matchFilter;
  });

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

  const handleSync = async () => {
    if (!apiLink) {
      Alert.alert("Lỗi", "Vui lòng nhập link MockAPI.io trước!");
      return;
    }

    try {
      const expenses = await getAllExpenses();

      const getRes = await fetch(apiLink);
      const remoteData = await getRes.json();
      await Promise.all(
        remoteData.map((item: any) =>
          fetch(`${apiLink}/${item.id}`, { method: "DELETE" })
        )
      );

      await Promise.all(
        expenses.map((e) =>
          fetch(apiLink, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e),
          })
        )
      );

      Alert.alert(
        "✅ Thành công",
        "Đồng bộ dữ liệu lên MockAPI.io thành công!"
      );
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Lỗi", "Không thể đồng bộ. Kiểm tra lại link API!");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      <View style={{ marginBottom: 10 }}>
        <Button title="Add" onPress={() => router.push("/modal")} />
      </View>

      <Button title="Thùng rác" onPress={() => router.push("/trash")} />
      <View style={{ marginTop: 10 }}>
        <Button title="Thống kê" onPress={() => router.push("/statistics")} />
      </View>

      <TextInput
        placeholder="Nhập link MockAPI.io để đồng bộ..."
        value={apiLink}
        onChangeText={setApiLink}
        style={styles.apiInput}
      />

      <View style={{ marginTop: 5, marginBottom: 10 }}>
        <Button title="Đồng bộ với API" onPress={handleSync} />
      </View>

      <TextInput
        placeholder="Tìm kiếm khoản thu/chi..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterButton, filter === "all" && styles.activeButton]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[styles.filterText, filter === "all" && styles.activeText]}
          >
            Tất cả
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filter === "income" && styles.activeButton,
          ]}
          onPress={() => setFilter("income")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "income" && styles.activeText,
            ]}
          >
            Thu
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filter === "expense" && styles.activeButton,
          ]}
          onPress={() => setFilter("expense")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "expense" && styles.activeText,
            ]}
          >
            Chi
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredData}
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
  apiInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
