import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>
      <View style={styles.content}>
        <Text>Danh sách thu chi sẽ hiển thị ở đây.</Text>
      </View>
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
  content: {
    flex: 1,
    marginTop: 20,
  },
});
