import { Inter } from "next/font/google";
import "./globals.css";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeFast",
  description: "Collect customer feedback and improve your products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <body className={inter.className}> {children} </body>
    </html>
  );
}
