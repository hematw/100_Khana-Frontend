import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  document.title = "100 Khana";

  return (
    <>
      <RoutesRenderer />
    </>
  );
}

function RoutesRenderer() {
  const element = useRoutes(routes);
  return element;
}

export default App;
