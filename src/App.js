// @ts-nocheck
import React, { Suspense } from "react";
import "./i18n";
import LanguageSelector from "./Components/LanguageSelector";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import Page404 from "./Components/Page404";
import Zoo from "./Components/Zoo";
import EmptyZoo from "./Components/EmptyZoo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "react-use-auth";

function App() {
  let isLogged = true;
  //const Navigate = useNavigate();
  const PrivateRoute = () => {
    const user = localStorage.getItem("user");
    return user ? <Dashboard /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <LanguageSelector />
        <Routes>
          <Route exact path="/" element={<SignupForm />} />
          <Route exact path="/login" element={<LoginForm />}>
            {/* {isLogged ? <Navigate to="/emptyzoo" /> : <LoginForm />} */}
          </Route>
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route exact path="/zoo" element={<Zoo />} />
          <Route exact path="/emptyzoo" element={<EmptyZoo />} />

          <Route exact path="*" element={<Page404 />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
