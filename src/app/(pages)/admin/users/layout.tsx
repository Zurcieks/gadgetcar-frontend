import Sidebar from "@/app/components/adminComponents/Sidebar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar/>
      <main className="flex-1  p-4">
        {" "}
        {/* Dodajemy margines po lewej stronie */}
        {children}
      </main>
    </div>
  );
}
