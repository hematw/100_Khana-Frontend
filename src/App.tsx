import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Providers from "./providers";

function App() {
  useEffect(() => {
    document.title = "100 Khana";
  }, []);

  return (
    <Providers>
      <RoutesRenderer />
      <ReactQueryDevtools />
    </Providers>
  );
}

function RoutesRenderer() {
  const element = useRoutes(routes);
  return element;
}

export default App;
