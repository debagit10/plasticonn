import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./images/logo.png";

const Landing = React.lazy(() => import("./pages/LandingPage"));
const RegisterCollector = React.lazy(
  () => import("./pages/auth/RegisterCollector")
);
const RegisterCenter = React.lazy(() => import("./pages/auth/RegisterCenter"));
const LoginCollector = React.lazy(() => import("./pages/auth/LoginCollector"));
const LoginCenter = React.lazy(() => import("./pages/auth/LoginCenter"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const History = React.lazy(() => import("./pages/History"));
const Support = React.lazy(() => import("./pages/Support"));
const DropOffCenters = React.lazy(() => import("./pages/DropOffCenters"));
const DropOffs = React.lazy(() => import("./pages/DropOffs"));
const ViewDrop = React.lazy(() => import("./pages/ViewDrop"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center mt-[70%]">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 animate-scale opacity-50"
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/register-collector" Component={RegisterCollector} />
        <Route path="/register-center" Component={RegisterCenter} />
        <Route path="/login-collector" Component={LoginCollector} />
        <Route path="/login-center" Component={LoginCenter} />
        <Route path="/:id/dashboard" Component={Dashboard} />
        <Route path="/:id/profile" Component={Profile} />
        <Route path="/:id/history" Component={History} />
        <Route path="/support" Component={Support} />
        <Route path="/drop-off-centers" Component={DropOffCenters} />
        <Route path="/:id/dropoffs" Component={DropOffs} />
        <Route path="/dropoff/:id/view" Component={ViewDrop} />
      </Routes>
    </Suspense>
  );
};

export default App;
