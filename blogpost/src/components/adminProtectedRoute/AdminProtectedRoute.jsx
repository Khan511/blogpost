import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.isAdmin ? (
    <Outlet />
  ) : currentUser ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default AdminProtectedRoute;
