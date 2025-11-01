import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import ExpenseItem from "../components/ExpenseItem";

const mockData = [
  {
    id: "1",
    title: "Lương tháng 10",
    amount: 12000000,
    createdAt: "2025-11-01",
    type: "Thu",
  },
  {
    id: "2",
    title: "Mua đồ ăn",
    amount: 150000,
    createdAt: "2025-11-01",
    type: "Chi",
  },
  {
    id: "3",
    title: "Mua sách",
    amount: 200000,
    createdAt: "2025-10-30",
    type: "Chi",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            createdAt={item.createdAt}
            type={item.type as "Thu" | "Chi"}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
