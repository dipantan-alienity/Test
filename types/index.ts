type FbAuth = {
  isLoggedIn: boolean;
  payload: FbAuthPayload;
  setFbAuth: (payload: FbAuthPayload) => void;
  logout: () => void;
};

type FbAuthPayload = {
  firstName: string | null;
  imageURL: string | null;
  lastName: string | null;
  linkURL: string | null;
  middleName: string | null;
  name: string | null;
  userID: string | null;
};
