 
import Navbar from "@/app/components/Navbar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      {children}
    </div>
  );
}
