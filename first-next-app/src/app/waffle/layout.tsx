export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="text-3xl">I am sub navbar of waffle page</h1>
      {children}
    </>
  );
}
