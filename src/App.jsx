import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import NewShipment from './components/NewShipment/NewShipment.jsx';
import ShipmentList from './components/ShipmentList/ShipmentList.jsx';
import AdminPanel from './components/Admin/AdminPanel.jsx';
import Home from './components/Home/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { auth } from './firebaseConfig';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'ankitkaushik6270@gmail.com';

  return (
    <div>
      {user && (
        <Navbar />
      )}
      {user && (
        <div className="spacing"></div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/new-shipment"
          element={
            <ProtectedRoute user={user}>
              <NewShipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipments"
          element={
            <ProtectedRoute user={user}>
              <ShipmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <ProtectedRoute user={user}>
                <AdminPanel />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user && (
        <Footer />
      )}
    </div>
  );
}

export default App;
