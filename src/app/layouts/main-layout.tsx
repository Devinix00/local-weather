import { Outlet } from "react-router-dom";
import Header from "../../widgets/header";
import Footer from "../../widgets/footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
