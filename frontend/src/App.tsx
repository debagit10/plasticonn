import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Landing = React.lazy(() => import("./pages/LandingPage"));
const RegisterCollector = React.lazy(
  () => import("./pages/auth/RegisterCollector")
);
const RegisterCenter = React.lazy(() => import("./pages/auth/RegisterCenter"));
const LoginCollector = React.lazy(() => import("./pages/auth/LoginCollector"));
const LoginCenter = React.lazy(() => import("./pages/auth/LoginCenter"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const DropOffCenters = React.lazy(() => import("./pages/DropOffCenters"));
const DropOffs = React.lazy(() => import("./pages/DropOffs"));
const ViewDrop = React.lazy(() => import("./pages/ViewDrop"));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/register-collector" Component={RegisterCollector} />
        <Route path="/register-center" Component={RegisterCenter} />
        <Route path="/login-collector" Component={LoginCollector} />
        <Route path="/login-center" Component={LoginCenter} />
        <Route path="/:id/dashboard" Component={Dashboard} />
        <Route path="/drop-off-centers" Component={DropOffCenters} />
        <Route path="/:id/dropoffs" Component={DropOffs} />
        <Route path="/dropoff/:id/view" Component={ViewDrop} />
      </Routes>
    </Suspense>
  );
};

export default App;
