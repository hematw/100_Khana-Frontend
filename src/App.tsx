import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import ThemeProvider from "./contexts/theme-context";

function App() {
  document.title = "100 Khana";

  return (
    <>
      <ThemeProvider>
        <RoutesRenderer />
      </ThemeProvider>
    </>
  );
}

function RoutesRenderer() {
  const element = useRoutes(routes);
  return element;
}

export default App;
