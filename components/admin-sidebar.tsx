"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Calendar, Settings, Bell, Cog } from "lucide-react"
import Image from "next/image"

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { id: "tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard/admin" },
    { id: "gestion-demandes", label: "Gestion des demandes", icon: FileText, href: "/dashboard/admin/gestion-demandes" },
    { id: "gestion-citoyens", label: "Gestion des citoyens", icon: Users, href: "/dashboard/admin/gestion-citoyens" },
    {
      id: "services-formulaires",
      label: "Services & Formulaires",
      icon: Settings,
      href: "/dashboard/admin/services-formulaires",
    },
    { id: "rendez-vous", label: "Rendez-vous", icon: Calendar, href: "/dashboard/admin/rendez-vous" },
    { id: "actualites-communications", label: "Actualités & Communications", icon: Bell, href: "/dashboard/admin/actualites" },
    { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/admin/notifications" },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white flex flex-col shadow-xl">
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <li title={item.label} key={item.id}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full truncate max-w-[200px] justify-start text-left h-12 px-4 ${
                      isActive ? "bg-white rounded-[5px] text-blue-600 hover:bg-white shadow-sm" : "text-white hover:bg-blue-600/50"
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
        <div className="text-xs text-blue-100 text-center leading-tight">
          <p>Version d'Aide & Logiciels Citoyen !</p>
          <p>Assistance Support ! Vos services</p>
        </div>
      </div>
    </div>
  )
}
