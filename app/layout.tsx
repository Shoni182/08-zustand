import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "@/app/globals.css";

//: Components
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

//: Metatags
import type { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Note-Hub",
  description: "Web app to create and save notes",
  openGraph: {
    title: "Note Hub",
    description: "Web app to create and save notes",
    url: "https://08-zustand-eight-beta.vercel.app",
    images: {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 640,
      height: 640,
      alt: "NoteHub Logo image",
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <div id="modal-root"></div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
