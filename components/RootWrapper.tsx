import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { useNavigation } from "expo-router";

const RootWrapper = ({ children }: any) => {
  const { isLoggedIn } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({ index: 0, routes: [{ name: "home" }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: "login" }] });
    }
  }, [isLoggedIn]);

  return children;
};

export default RootWrapper;
