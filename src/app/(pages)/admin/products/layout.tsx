import Sidebar from "@/app/components/adminComponents/Sidebar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>

      <main className="flex-1  p-4">
        {" "}
 
        {children}
      </main>
    </div>
  );
}
