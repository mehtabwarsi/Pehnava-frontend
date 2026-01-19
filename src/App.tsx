import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginApi } from "./services/publicapiservice";
import { setUser, logout } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

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

  return (
    <>
      <Helmet>
        <title>Pehnava | Contemporary Traditional Wear</title>
        <meta name="description" content="Discover Pehnava's exclusive collection of contemporary traditional wear. Elegant kurtas, sherwanis, and ethnic accessories for the modern wardrobe." />
        <meta property="og:title" content="Pehnava | Contemporary Traditional Wear" />
        <meta property="og:description" content="Discover Pehnava's exclusive collection of contemporary traditional wear. Elegant kurtas, sherwanis, and ethnic accessories for the modern wardrobe." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="traditional wear, contemporary ethnic, kurta, sherwani, Indian fashion, Pehnava" />
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </>
  );
};

export default App;
