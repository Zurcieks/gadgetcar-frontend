import Navbar from "@/app/components/Navbar";

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <Navbar
          backgroundColor="bg-white"
          borderColor="border-black"
          textColor="text-black"
        />
      </header>

      {children}
    </div>
  );
}
 