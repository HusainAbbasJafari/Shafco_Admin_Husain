// import api from "./api";
// import { loginSuccess } from "@redux/store/authSlice"
// import { useDispatch } from "react-redux";

// export const useLogin = () => {
//   const dispatch = useDispatch();

//   const handleLogin = async (credentials) => {
//     try {
//       const response = await api.post("/login", credentials);
//       dispatch(
//         loginSuccess({
//           token: response.token,
//           user: response.data,
//         })
//       );
//       return { success: true, error: null };
//     } catch (err) {
//       return { success: false, error: err.response?.data?.message || "Login failed!" };
//     }
//   };

//   return { handleLogin };
// };
