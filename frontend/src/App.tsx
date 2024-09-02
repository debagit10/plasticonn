import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Landing = React.lazy(() => import("./pages/LandingPage"));
const RegisterCollector = React.lazy(
  () => import("./pages/auth/RegisterCollector")
);
const RegisterCenter = React.lazy(() => import("./pages/auth/RegisterCenter"));
const Login = React.lazy(() => import("./pages/auth/Login"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/register-collector" Component={RegisterCollector} />
        <Route path="/register-drop-off-center" Component={RegisterCenter} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
};

export default App;
