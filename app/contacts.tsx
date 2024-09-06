import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import useAuthStore from "@/store/authStore";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Contacts = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { payload } = useAuthStore();

  useEffect(() => {
    database()
      .ref("/users")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const usersList = [];
        for (const key in data) {
          usersList.push({ ...data[key], userID: key });
        }
        setUsers(usersList.filter((user) => user.userID !== payload?.userID));
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        contentContainerStyle={{
          padding: 20,
        }}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18 }}>No contacts</Text>
          </View>
        )}
        keyExtractor={(item) => item.userID}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item?.imageURL || "https://i.pravatar.cc/300" }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {item?.name || item?.firstName + " " + item.lastName}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "blue",
          padding: 20,
          borderRadius: 50,
          alignItems: "center",
        }}
        onPress={() => router.push("/addContact")}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
