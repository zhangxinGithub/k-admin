import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import App from "@/App";
import Loading from "@/components/loading";

import Login from "@/pages/login.jsx"; // Import the Login component
import Project from "@/pages/project/index.jsx";
import Account from "@/views/account.jsx";
import BackConfigurePage from "@/views/backConfigurePage"; // Import another new page component
import Chat from "@/views/chat.jsx";
import Clue from "@/views/clue.jsx";
import ConfigurePage from "@/views/configurePage"; // Import the new page component
import Employee from "@/views/employee.jsx";
import Robot from "@/views/robot.jsx";

function Routers () {
  return (
    <Suspense fallback={<Loading />}>
      <Router basename={process.env.PUBLIC_BASE || "/"}>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Add the login route */}
          <Route path="project" element={<Project />}>
            <Route index element={<Robot />} />
            <Route path="account/:id" element={<Account />} />
            <Route path="chat" element={<Chat />} />
            <Route path="robot" element={<Robot />} />
            <Route path="clue" element={<Clue />} />
            <Route path="employee" element={<Employee />} /> {/* Ensure this route is correct */}
            <Route path="configure" element={<ConfigurePage />} /> {/* Add new route */}
            <Route path="backconfigure" element={<BackConfigurePage />} /> {/* Add another new route */}
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routers;
