import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const handleLogout = () => {
    navigation.replace("Login");
  };

  const handleContact = (type, value) => {
    switch (type) {
      case "email":
        Linking.openURL(`mailto:${value}`);
        break;
      case "phone":
        Linking.openURL(`tel:${value}`);
        break;
      case "maps":
        Linking.openURL(`https://maps.google.com/?q=${value}`);
        break;
    }
  };

  const features = [
    {
      icon: "bicycle",
      title: "Pencarian Motor",
      desc: "motor baru dan jadul",
    },
    {
      icon: "book",
      title: "Terlengkap",
      desc: "Lebih dari 100 motor",
    },
    {
      icon: "shield-checkmark",
      title: "Trusted",
      desc: "Informasi Terpercaya",
    },
  ];

  const contacts = [
    {
      icon: "mail",
      title: "Email",
      value: "support@MotorkuX.com",
      color: "#ea4335",
      action: () => handleContact("email", "support@MotorkuX.com"),
    },
    {
      icon: "call",
      title: "Telepon",
      value: "(012) 3456-7891",
      color: "#34a853",
      action: () => handleContact("phone", "01234567891"),
    },
    {
      icon: "location",
      title: "Alamat",
      value: "Jl. Depanrumah No. 1",
      color: "#4285f4",
      action: () => handleContact("maps", "Jl. Depanrumah No. 1, IKN"),
    },
  ];

  const socials = [
    { icon: "logo-facebook", color: "#1877F2", url: "https://facebook.com" },
    { icon: "logo-instagram", color: "#E4405F", url: "https://instagram.com" },
    { icon: "logo-twitter", color: "#1DA1F2", url: "https://twitter.com" },
    { icon: "logo-youtube", color: "#FF0000", url: "https://youtube.com" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <View>
            <Text style={styles.appName}>RideX</Text>
            <Text style={styles.version}>Nalendra Faraz Putra Rahadyan</Text>
            <Text style={styles.version}>21120122140098</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitur Utama</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name={feature.icon} size={24} color="#007AFF" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hubungi Kami</Text>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactCard}
            onPress={contact.action}
          >
            <View
              style={[styles.contactIcon, { backgroundColor: contact.color }]}
            >
              <Ionicons name={contact.icon} size={20} color="white" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{contact.title}</Text>
              <Text style={styles.contactValue}>{contact.value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        <View style={styles.socialGrid}>
          {socials.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialButton, { backgroundColor: social.color }]}
              onPress={() => Linking.openURL(social.url)}
            >
              <Ionicons name={social.icon} size={24} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  version: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  featureCard: {
    width: "47%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    elevation: 2,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDesc: {
    fontSize: 12,
    color: "#666",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    color: "#666",
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff3b30",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
