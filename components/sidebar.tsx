"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Bell, MessageCircle, User, LogOut, Cog, Menu, X } from "lucide-react"
import Image from "next/image"

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard/client/tableau-de-bord" },
    { id: "mes-demandes", label: "Mes demandes", icon: FileText, href: "/dashboard/client/mes-demandes" },
    { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/client/notifications" },
    { id: "aide-assistant", label: "Aide & Assistant", icon: MessageCircle, href: "/dashboard/client/aide-assistant" },
    { id: "mon-profil", label: "Mon profil", icon: User, href: "/dashboard/client/mon-profil" },
  ]

  const handleLogout = () => {
    console.log("Déconnexion en cours...")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-2 mr-10 z-50 md:hidden bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
     <div
  className={`fixed left-0 top-0 h-full w-64 bg-[url('/images/bg-sidebar.svg')] bg-cover bg-center text-white flex flex-col shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0`}
>

        {/* Logo Section */}
        <div className="p-4">
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/footer1.svg"
                    alt="Logo Commune du Plateau"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/footer2.svg"
                  alt="Logo Commune du Plateau"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-1">Bonjour Awa</h2>
            <p className="text-blue-100 text-lg">
              Bienvenue sur votre
              <br />
              espace citoyen !
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.href === "/mes-demandes" && pathname.startsWith("/mes-demandes"))

              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-lg text-left h-12 px-4 transition-all duration-200 ${
                        isActive ? "bg-white text-blue-600 hover:bg-white shadow-sm" : "text-white hover:bg-blue-600/50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-blue-400/30">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-blue-600/50 mb-4 transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Déconnexion
          </Button>

          {/* <div className="text-xs text-blue-100 text-center leading-tight">
            <p>Version d'Aide & Logiciels Citoyen !</p>
            <p>Assistance Support ! Vos services</p>
          </div> */}
        </div>
      </div>
    </>
  )
}
