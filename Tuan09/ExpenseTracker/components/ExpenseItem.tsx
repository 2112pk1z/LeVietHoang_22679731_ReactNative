import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ExpenseItemProps = {
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
};

export default function ExpenseItem({
  title,
  amount,
  createdAt,
  type,
}: ExpenseItemProps) {
  const isIncome = type === "Thu";

  return (
    <View style={[styles.item, isIncome ? styles.income : styles.expense]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{createdAt}</Text>
      </View>
      <Text style={styles.amount}>
        {isIncome ? "+" : "-"} {amount.toLocaleString()} ₫
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  income: {
    borderLeftWidth: 5,
    borderLeftColor: "#2ecc71",
  },
  expense: {
    borderLeftWidth: 5,
    borderLeftColor: "#e74c3c",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
