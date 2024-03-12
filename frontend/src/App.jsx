import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { HomePage, DetailsPage, UpdatePage } from "./pages";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
