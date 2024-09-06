import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";
import useAuthStore from "@/store/authStore";
import database from "@react-native-firebase/database";
import messaging from "@react-native-firebase/messaging";

const index = () => {
  const { setFbAuth } = useAuthStore();

  const getProfile = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
      ]);
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          const profile = await Profile.getCurrentProfile();
          if (profile) {
            setFbAuth({
              firstName: profile.firstName || null,
              imageURL: profile.imageURL || null,
              lastName: profile.lastName || null,
              linkURL: profile.linkURL || null,
              middleName: profile.middleName || null,
              name: profile.name || null,
              userID: profile.userID || null,
            });
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              ToastAndroid.show(
                "Notifications permission granted",
                ToastAndroid.SHORT
              );
            } else {
              ToastAndroid.show(
                "Notifications permission denied",
                ToastAndroid.SHORT
              );
            }
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            await database()
              .ref(`users/${profile.userID}`)
              .set({
                ...profile,
                token,
              });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={getProfile}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#0866ff",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Image
          source={require("../assets/fb.png")}
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Continue with Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
