import Sidebar from "@/app/components/accountComponents/Sidebar";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
 

      <main className="">{children}</main>
    </div>
  );
}
