import { Navigate } from "react-router-dom";

// import useUser from '@hooks/auth/useUser'

export default function PrivateRoute({ children }) {
  // const user = useUser();
  const user = null;
  if (user == null) {
    return <Navigate to="/signin" replace={true} />;
  }
  return <>{children}</>;
}
