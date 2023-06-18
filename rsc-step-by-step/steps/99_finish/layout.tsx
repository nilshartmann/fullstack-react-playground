import "./globals.css";
import { Inter } from "next/font/google";
import AppLink from "@/app/components/AppLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RSC - Step by Step",
  description: "React Server Components, step-by-step example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={"Root"}>
          <div className={"PageHeader"}>
            <h1>Next.JS Blog Example</h1>
            <AppLink className="Button" href="/">
              Home
            </AppLink>
          </div>
          <div className={"App"}>
            <div className="Page">
              <div className="Main">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
