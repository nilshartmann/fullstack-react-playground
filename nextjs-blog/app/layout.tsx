import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className={"Root"}>
          <div className={"App"}>{children}</div>
        </div>
      </body>
    </html>
  );
}
