import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginApi } from "./services/apiservices";
import { setUser, logout } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        // 🔴 User NOT logged in
        if (!firebaseUser) {
          dispatch(logout());
          return;
        }

        // 🟢 User logged in → get token
        const token = await firebaseUser.getIdToken();

        // 🔗 Backend login (create / fetch user)
        const res = await loginApi(token);

        if (res.success) {
          dispatch(setUser(res.message));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth sync error:", error);
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  return <AppRoutes />;
};

export default App;
