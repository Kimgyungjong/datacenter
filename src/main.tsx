import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MultiContextProvider } from "@src/context/Context.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
//import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <MultiContextProvider>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <App />
      </MultiContextProvider>
    </QueryClientProvider>
  </>
);
