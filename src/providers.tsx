import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import AuthProvider from "./contexts/auth-context";
import ThemeProvider from "./contexts/theme-context";

const queryClient = new QueryClient();

function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeroUIProvider>
          <ToastProvider
            placement="top-center"
            toastProps={{
              variant: "solid",
              timeout: 3000,
            }}
          />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </HeroUIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
