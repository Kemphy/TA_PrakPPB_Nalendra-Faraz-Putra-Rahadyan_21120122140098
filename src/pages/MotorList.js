import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function MotorList({ navigation }) {
  const [motors, setMotors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [dropdownBrandOpen, setDropdownBrandOpen] = useState(false);
  const [dropdownTypeOpen, setDropdownTypeOpen] = useState(false);

  useEffect(() => {
    fetchMotors();
  }, []);

  const fetchMotors = async () => {
    try {
      const response = await axios.get(
        "https://ta-praktikum-ppb-nalen-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json"
      );
      const motorData = response.data;
      const motorArray = Object.keys(motorData).map((key) => ({
        ...motorData[key],
        uniqueId: key,
      }));

      const brandSet = new Set(motorArray.map((motor) => motor.brand));

      const typeSet = new Set();
      motorArray.forEach((motor) => {
        if (Array.isArray(motor.type)) {
          motor.type.forEach((type) => {
            if (type) typeSet.add(type.trim());
          });
        } else if (typeof motor.type === "string") {
          typeSet.add(motor.type.trim());
        }
      });

      const typeCategories = {
        "Motor Sport": ["Sport", "Racing", "Super Sport", "Big Bike"],
        "Motor Matic": ["Matic", "Scooter", "Big Scooter", "Medium Scooter"],
        "Motor City": ["City", "Cub", "Efficient", "Naked bike"],
        "Motor Adventure": [
          "Adventure",
          "Trail",
          "Touring",
          "Enduro / offroad",
        ],
        "Motor Khusus": ["ATV", "Cross / motocross", "Super motard"],
        "Motor Klasik": ["Classic", "Allround", "Custom / cruiser"],
      };

      const organizedTypes = [];
      Object.entries(typeCategories).forEach(([category, types]) => {
        const availableTypes = types.filter((type) => typeSet.has(type));
        if (availableTypes.length > 0) {
          organizedTypes.push({
            category,
            types: availableTypes,
          });
        }
      });

      setMotors(motorArray);
      setBrands(Array.from(brandSet).sort());
      setTypes(organizedTypes);
    } catch (error) {
      console.error("Error fetching motors:", error);
    }
  };

  const getFilteredMotors = () => {
    let filteredMotors = motors;

    if (selectedBrand) {
      filteredMotors = filteredMotors.filter(
        (motor) => motor.brand === selectedBrand
      );
    }

    if (selectedType) {
      filteredMotors = filteredMotors.filter((motor) => {
        if (Array.isArray(motor.type)) {
          return motor.type.includes(selectedType);
        }
        return motor.type === selectedType;
      });
    }

    return filteredMotors;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderMotorCard = ({ item }) => (
    <TouchableOpacity
      style={styles.motorCard}
      onPress={() => navigation.navigate("MotorDetail", { motor: item })}
    >
      <Image source={{ uri: item.image }} style={styles.motorImage} />
      <View style={styles.motorInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.modelText}>{item.model}</Text>
        <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
        <View style={styles.typeContainer}>
          {Array.isArray(item.type) &&
            item.type.map((type, index) => (
              <Text key={index} style={styles.typeText}>
                {type}
              </Text>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Motor</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setDropdownBrandOpen(!dropdownBrandOpen);
            setDropdownTypeOpen(false);
          }}
        >
          <Text style={styles.dropdownText}>
            {selectedBrand || "Pilih Pabrikan"}
          </Text>
          <Ionicons
            name={dropdownBrandOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setDropdownTypeOpen(!dropdownTypeOpen);
            setDropdownBrandOpen(false);
          }}
        >
          <Text style={styles.dropdownText}>
            {selectedType || "Pilih Tipe"}
          </Text>
          <Ionicons
            name={dropdownTypeOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        {(selectedBrand || selectedType) && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setSelectedBrand(null);
              setSelectedType(null);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {dropdownBrandOpen && (
        <View style={styles.dropdownList}>
          {brands.map((brand, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedBrand(brand);
                setDropdownBrandOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{brand}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {dropdownTypeOpen && (
        <View style={[styles.dropdownList, styles.typeDropdownList]}>
          <ScrollView>
            {types.map((category, categoryIndex) => (
              <View key={categoryIndex}>
                <Text style={styles.categoryHeader}>{category.category}</Text>
                {category.types.map((type, typeIndex) => (
                  <TouchableOpacity
                    key={`${categoryIndex}-${typeIndex}`}
                    style={[
                      styles.dropdownItem,
                      selectedType === type && styles.selectedDropdownItem,
                    ]}
                    onPress={() => {
                      setSelectedType(type);
                      setDropdownTypeOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedType === type &&
                          styles.selectedDropdownItemText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={getFilteredMotors()}
        renderItem={renderMotorCard}
        keyExtractor={(item) => item.uniqueId || item.id?.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Tidak ada motor yang sesuai filter
          </Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dropdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 14,
    color: "#666",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginBottom: 8,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  resetButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 16,
  },
  motorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    overflow: "hidden",
  },
  motorImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  motorInfo: {
    padding: 16,
  },
  brandText: {
    fontSize: 14,
    color: "#666",
  },
  modelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  priceText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  typeText: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 32,
  },
  typeDropdownList: {
    maxHeight: 300,
    overflow: "hidden",
  },
  categoryHeader: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    paddingLeft: 16,
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  selectedDropdownItem: {
    backgroundColor: "#e6f2ff",
  },
  selectedDropdownItemText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
