
import Navbar from '@/components/navbar';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section >
      <Navbar />
      <main className="">
        {children}
      </main>
    </section>
  );
}
