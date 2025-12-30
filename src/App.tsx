import { api } from './ApiService/axios';
import AppRoutes from './routes/AppRoutes'

const App = () => {
  console.log("API BASE URL 👉", import.meta.env.VITE_API_BASE_URL);
  console.log("AXIOS BASE:", api.defaults.baseURL);

  return (
    <AppRoutes />
  )
}

export default App