import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Home from "./pages/Home.jsx";
import ListingShow from "./pages/ListingShow.jsx";
import NewListing from "./pages/NewListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings/new" element={<PrivateRoute><NewListing /></PrivateRoute>} />
          <Route path="/listings/:id" element={<ListingShow />} />
          <Route
            path="/listings/:id/edit"
            element={
              <PrivateRoute>
                <EditListing />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}