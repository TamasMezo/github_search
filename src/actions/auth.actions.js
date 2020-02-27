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
  axios
    .post(url, authData)
    .then(response => {
      console.log("response", response);
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", response.data.localId);
      localStorage.setItem("email", email);
    })
    .catch(error => {
      console.log("Error while authenticate!", error);
      throw new Error(error);
    });
};
