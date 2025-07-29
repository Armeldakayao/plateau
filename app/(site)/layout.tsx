// import Footer from "@/components/layout/footer";
// import Header from "@/components/layout/header";
// import type React from "react";
// import "../globals.css";
// import ChatbotPopup from "@/components/chatbot";
// import SmoothScroll from "@/components/smooth-scroll";

// export default function SiteLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <SmoothScroll>{children}</SmoothScroll>
//       </main>
//       <ChatbotPopup />
//       <Footer />
//     </div>
//   );
// }
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import type React from "react"
import ChatbotPopup from "@/components/chatbot"
import SmoothScroll from "@/components/smooth-scroll"
import GradientAnimation from "@/components/gradient"



interface SiteLayoutProps {
  children: React.ReactNode
  animation?: "bubbles" | "particles" | "waves" | "gradient" | "dots" | "none"
}

export default function SiteLayout({ children, animation = "waves" }: SiteLayoutProps) {
  const renderAnimation = () => {
    switch (animation) {
     
      case "waves":
        return <GradientAnimation />
      
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <GradientAnimation />
      <Header />
      <main className="flex-grow relative z-10">
        <SmoothScroll>{children}</SmoothScroll>
      </main>
      <ChatbotPopup />
      <Footer />
    </div>
  )
}
