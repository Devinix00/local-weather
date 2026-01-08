import Router from "./router";
import { QueryProvider } from "./providers";
import { Toast } from "../shared/ui";

export default function App() {
  return (
    <QueryProvider>
      <Router />
      <Toast />
    </QueryProvider>
  );
}
