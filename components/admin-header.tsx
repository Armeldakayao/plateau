"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"

interface AdminHeaderProps {
  title: string
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
