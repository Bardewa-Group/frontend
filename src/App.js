import { useAuth } from "./context/AuthContext";
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { InitialLoader } from "./private/helper/config"
import { ThemeContextProvider } from "./ThemeContext/ThemeContext";
import Home from "./public/Home";

// Lazy loading components
const Layout = lazy(() => import('./private/components/Layout'));
const Login = lazy(() => import('./public/Login'));

const PublicRoute = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Login />} />
  </Routes>
);

const App = () => {
  const { authToken } = useAuth();


  return (
    <ThemeContextProvider>
      <Suspense fallback={<InitialLoader initialLoader={true} />}>
        {authToken ? <Layout /> : <PublicRoute />}
      </Suspense>
    </ThemeContextProvider>
  );
};

export default App;
