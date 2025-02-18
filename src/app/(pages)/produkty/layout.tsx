
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <header className="">
        <Navbar backgroundColor="" borderColor="border-b-2" textColor=" " />
      </header>

      <main className="pt-20">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
