import { useAuth } from "../context/AuthContext";

function TestComponent(): JSX.Element {
  const { getAuthUser } = useAuth();
  console.log(getAuthUser());
  return (
    <section>
      <h1>LoggedIn</h1>
    </section>
  );
}

export default TestComponent;