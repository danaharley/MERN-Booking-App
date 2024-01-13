import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <main className="container mx-auto flex-1 py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
