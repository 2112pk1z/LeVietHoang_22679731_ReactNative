import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const [name, setName] = useState<string>("");

  const handleStart = () => {
    if (!name.trim()) return alert("Please enter your name!");
    router.push({ pathname: "/tasks", params: { name } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.btnText}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00CFFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
