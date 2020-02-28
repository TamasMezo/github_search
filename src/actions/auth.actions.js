import axios from "axios";

export const signUp = (email, password, name, isSignUp) => {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7Snz6EMfifGVaoMcS9SFM-VZJBPRcCe8";

  if (isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7Snz6EMfifGVaoMcS9SFM-VZJBPRcCe8";
  }
  const authData = {
    email: email,
    password: password,
    name: name,
    returnSecureToken: true
  };
  return axios.post(url, authData);
};
