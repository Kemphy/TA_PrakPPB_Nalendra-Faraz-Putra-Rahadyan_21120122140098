import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MotorDetail({ route, navigation }) {
  const { motor } = route.params;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const colorArray = motor.color ? Object.values(motor.color) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{motor.model}</Text>
        </View>

        <Image source={{ uri: motor.image }} style={styles.mainImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{motor.brand}</Text>
          <Text style={styles.model}>
            {motor.model} ({motor.year})
          </Text>
          <Text style={styles.price}>{formatPrice(motor.price)}</Text>

          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Ionicons name="speedometer-outline" size={24} color="#007AFF" />
              <Text style={styles.specLabel}>Engine</Text>
              <Text style={styles.specValue}>{motor.engine}</Text>
            </View>

            <View style={styles.specItem}>
              <Ionicons name="cog-outline" size={24} color="#007AFF" />
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>{motor.transmission}</Text>
            </View>

            <View style={styles.specItem}>
              <Ionicons name="bicycle-outline" size={24} color="#007AFF" />
              <Text style={styles.specLabel}>Type</Text>
              <Text style={styles.specValue}>
                {Array.isArray(motor.type) ? motor.type.join(", ") : motor.type}
              </Text>
            </View>
          </View>

          {colorArray.length > 0 && (
            <View style={styles.colorsSection}>
              <Text style={styles.sectionTitle}>Available Colors</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {colorArray.map((color, index) => (
                  <View key={index} style={styles.colorItem}>
                    <Image
                      source={{ uri: color.image }}
                      style={styles.colorImage}
                    />
                    <Text style={styles.colorName}>{color.warna}</Text>
                    <Text style={styles.colorType}>{color.type}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.additionalSpecs}>
            <Text style={styles.sectionTitle}>Detailed Specifications</Text>
            {Object.entries(motor).map(([key, value]) => {
              if (
                [
                  "image",
                  "color",
                  "id",
                  "brand",
                  "model",
                  "price",
                  "type",
                  "year",
                ].includes(key)
              )
                return null;

              return (
                <View key={key} style={styles.specRow}>
                  <Text style={styles.specKey}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/_/g, " ")}
                  </Text>
                  <Text style={styles.specValue}>
                    {Array.isArray(value) ? value.join(", ") : value}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  brand: {
    fontSize: 16,
    color: "#666",
  },
  model: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  specItem: {
    alignItems: "center",
    flex: 1,
  },
  specLabel: {
    color: "#666",
    marginTop: 4,
    fontSize: 12,
  },
  specValue: {
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  colorsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  colorItem: {
    marginRight: 16,
    alignItems: "center",
    width: 120,
  },
  colorImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  colorName: {
    marginTop: 8,
    fontWeight: "600",
  },
  colorType: {
    color: "#666",
    fontSize: 12,
  },
  additionalSpecs: {
    marginTop: 24,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  specKey: {
    color: "#666",
    flex: 1,
  },
  specValue: {
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
});
