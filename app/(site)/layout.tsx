import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type React from "react";
import "../globals.css";
import ChatbotPopup from "@/components/chatbot";
import SmoothScroll from "@/components/smooth-scroll";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <main className="flex-grow">
      <SmoothScroll>
     {children}
      </SmoothScroll>
      </main>
      <ChatbotPopup />
      <Footer />
    </div>
  );
}
