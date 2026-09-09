import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase";

export default function ProtectedRoute() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /*
   * Firebase is still checking the
   * authentication state.
   */
  if (checkingAuth) {
    return (
      <div className="auth-loading">
        Loading...
      </div>
    );
  }

  /*
   * User is NOT logged in
   */
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
   * User is authenticated
   */
  return <Outlet />;
}