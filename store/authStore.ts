// store for fb auth
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create<FbAuth>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      payload: {
        firstName: null,
        imageURL: null,
        lastName: null,
        linkURL: null,
        middleName: null,
        name: null,
        userID: null,
      },
      setFbAuth(payload) {
        set({ payload, isLoggedIn: true });
      },
      logout() {
        set({
          payload: {
            firstName: null,
            imageURL: null,
            lastName: null,
            linkURL: null,
            middleName: null,
            name: null,
            userID: null,
          },
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "fb-auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
