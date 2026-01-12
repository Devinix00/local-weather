import Router from "./router";
import { QueryProvider } from "./providers";
import { Toast } from "../shared/ui";
import RootLoading from "../widgets/root-loading";

export default function App() {
  return (
    <QueryProvider>
      <RootLoading />
      <Router />
      <Toast />
    </QueryProvider>
  );
}
