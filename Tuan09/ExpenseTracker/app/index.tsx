import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useDatabase } from "../hooks/useDatabase";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { getExpenses } = useDatabase();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  const loadData = async () => {
    const items = await getExpenses();
    setData(items);
  };

  // ✅ Tự reload khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      <Button title="Add" onPress={() => router.push("/modal")} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit",
                params: { id: item.id.toString() },
              })
            }
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
