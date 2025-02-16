import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <Navbar backgroundColor="" borderColor="border-b-2" textColor=" " />
      </header>

      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
