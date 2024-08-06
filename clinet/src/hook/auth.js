import {jwtDecode} from "jwt-decode";


export const auth = () => {
  try {
    const cookieObject = Object.fromEntries(
      document.cookie.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, value];
      })
    );

    const token = cookieObject["token"];
    if (!token) {
      throw new Error("No token found in cookies");
    }

    const decodedToken = jwtDecode(token);
    const { user } = decodedToken;

    // // Dispatch action to set authenticated user in Redux state
    // const dispatch = useDispatch();
    // dispatch(setUser(user));
console.log(user);
    return user;
  } catch (error) {
    console.error("Authentication error:", error.message);
    return null; // Return null or handle error as needed
  }
};

// export default auth;
