import Router from "./router";
import { QueryProvider } from "./providers";

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
