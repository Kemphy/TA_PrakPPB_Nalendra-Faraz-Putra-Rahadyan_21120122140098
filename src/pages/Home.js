import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function Home({ navigation }) {
  const [motors, setMotors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMotors();
  }, []);

  const fetchMotors = async () => {
    try {
      const response = await axios.get(
        "https://ta-praktikum-ppb-nalen-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json"
      );
      const motorArray = Object.entries(response.data).map(([key, value]) => ({
        ...value,
        uniqueId: key,
      }));
      setMotors(motorArray);
    } catch (error) {
      console.error("Error fetching motors:", error);
    }
  };

  const filteredMotors = motors.filter((motor) => {
    const matchesSearch = motor.model
      .toLowerCase()
      .includes(search.toLowerCase());
    const type = Array.isArray(motor.type) ? motor.type : [motor.type];
    return matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Motor Showcase</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search models..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.motorList}>
          {filteredMotors.map((motor) => (
            <TouchableOpacity
              key={motor.uniqueId || Math.random().toString()}
              style={styles.motorCard}
              onPress={() => {
                try {
                  navigation.navigate("MotorDetail", { motor });
                } catch (error) {
                  console.error("Navigation error:", error);
                }
              }}
            >
              <Image source={{ uri: motor.image }} style={styles.motorImage} />
              <Text style={styles.motorBrand}>{motor.brand}</Text>
              <Text style={styles.motorModel}>{motor.model}</Text>
              <Text style={styles.motorPrice}>{formatPrice(motor.price)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: { flex: 1, marginLeft: 8 },
  motorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  motorCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    alignItems: "center",
  },
  motorImage: { width: "100%", height: 120, borderRadius: 8 },
  motorText: { marginTop: 8, fontSize: 16, fontWeight: "bold" },
});
