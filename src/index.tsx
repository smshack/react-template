import ReactDOM from "react-dom/client";
import RouteApp from "./pages/RouteApp";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <RouteApp />
				<ReactQueryDevtools initialIsOpen />
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>,
);
