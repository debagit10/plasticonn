import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Landing = React.lazy(() => import("./pages/LandingPage"));
const RegisterCollector = React.lazy(
  () => import("./pages/auth/RegisterCollector")
);
const RegisterCenter = React.lazy(() => import("./pages/auth/RegisterCenter"));
const LoginCollector = React.lazy(() => import("./pages/auth/LoginCollector"));
const LoginCenter = React.lazy(() => import("./pages/auth/LoginCenter"));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/register-collector" Component={RegisterCollector} />
        <Route path="/register-center" Component={RegisterCenter} />
        <Route path="/login-collector" Component={LoginCollector} />
        <Route path="/login-center" Component={LoginCenter} />
      </Routes>
    </Suspense>
  );
};

export default App;
