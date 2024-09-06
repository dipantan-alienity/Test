import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MenuView } from "@react-native-menu/menu";
import Entypo from "@expo/vector-icons/Entypo";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";
import database from "@react-native-firebase/database";

const Home = () => {
  const { logout, payload } = useAuthStore();

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <MenuView
          title="Menu Title"
          onPressAction={({ nativeEvent }) => {
            if (nativeEvent.event === "1") {
              // profile
              router.push("/profile");
            } else if (nativeEvent.event === "2") {
              // contacts
              router.push("/contacts");
            } else if (nativeEvent.event === "3") {
              // logout
              database().ref(`/users/${payload.userID}`).remove();
              logout();
            }
          }}
          actions={[
            {
              id: "1",
              title: "Profile",
            },
            {
              id: "2",
              title: "Contacts",
            },
            {
              id: "3",
              title: "Logout",
            },
          ]}
          shouldOpenOnLongPress={false}
          style={{ backgroundColor: "transparent" }}
        >
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color={"#000"} />
          </TouchableOpacity>
        </MenuView>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="SOS" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
