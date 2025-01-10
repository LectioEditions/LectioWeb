import Image from 'next/image';
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (

          <main className="relative h-screen w-full bg-white-6 dark:bg-black-3">
            
              {children}
          </main>
    );
  }
  