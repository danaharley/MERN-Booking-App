import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/layout";
import Register from "./pages/register";
import SignIn from "./pages/sign-in";
import AddHotel from "./pages/add-hotel";

import { useAppContext } from "./contexts/app-context";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Homepage</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn ? (
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        ) : null}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
