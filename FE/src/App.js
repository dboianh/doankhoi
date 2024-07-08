import React, {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import AuthJWT from './pages/auth'
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import DashboardAppPage from './pages/DashboardAppPage'



function App() {

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <HelmetProvider>

    <Router>
      <ThemeProvider>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {publicRoutes.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={item.element}
              ></Route>
            );
          })}
          {
            privateRoutes.map((item, index) => {
              return (
                <Route key={index} path="/dashboard" element={
                  <AuthJWT>
                    <DashboardLayout />
                  </AuthJWT>
                }>
                  <Route key={index} path={item.path} element={item.element} />
                </Route>

              );
            })
          }
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
    </HelmetProvider>

  );
}

export default App;
