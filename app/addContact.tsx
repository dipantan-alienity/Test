import {
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";

const AddContact = () => {
  useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

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
          onPress={async () => {
            if (phoneNumber) {
              const token = await AccessToken.getCurrentAccessToken();
              const request = new GraphRequest(
                "/me/friends",
                {
                  accessToken: token?.accessToken,
                },
                (error, result) => {
                  console.log(result, error);
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(result);
                  }
                }
              );
              new GraphRequestManager().addRequest(request).start();
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

export default AddContact;

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
