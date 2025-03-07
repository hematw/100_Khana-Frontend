import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import ThemeProvider from "./contexts/theme-context";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeroUIProvider } from "@heroui/system";
import {ToastProvider} from "@heroui/toast";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.title = "100 Khana";
  }, []);

  return (
    <>
      <ThemeProvider>
        <HeroUIProvider>
          <ToastProvider placement="top-center"/>
          <QueryClientProvider client={queryClient}>
            <RoutesRenderer />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </>
  );
}

function RoutesRenderer() {
  const element = useRoutes(routes);
  return element;
}

export default App;
