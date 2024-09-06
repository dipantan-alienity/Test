import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";

const Profile = () => {
  const { payload } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    database()
      .ref(`/users/${payload.userID}`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 20,
          borderRadius: 8,
        }}
      >
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          autoFocus
        />

        <Button
          title="Submit"
          onPress={() => {
            if (phoneNumber) {
              database().ref(`/users/${payload.userID}`).update({
                phoneNumber,
              });
              ToastAndroid.show("Phone number updated", ToastAndroid.SHORT);
              router.back();
            } else {
              ToastAndroid.show(
                "Please enter a phone number",
                ToastAndroid.SHORT
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: Dimensions.get("window").height / 16,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    fontSize: 16,
    borderColor: "black",
  },
});
