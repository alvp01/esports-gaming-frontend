import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

function TestComponent(): JSX.Element {
  const { getAuthUser } = useAuth();
  console.log(getAuthUser());
  return (
    <div>
      <Navbar />
      <h1>LoggedIn</h1>
    </div>
  );
}

export default TestComponent;