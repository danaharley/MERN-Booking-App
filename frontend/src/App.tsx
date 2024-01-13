import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/layout";

const App = () => {
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
