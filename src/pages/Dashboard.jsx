import { useSelector } from "react-redux";

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <h2>You must be logged in to view this page.</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user.username}!</p>
    </div>
  );
}
