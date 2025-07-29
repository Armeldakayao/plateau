"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mic, User, Bot, Bell } from "lucide-react"
import Sidebar from "@/components/sidebar"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AideAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Bonjour ! Je suis KOUASSI, l'intelligence citoyenne de l'Plateau ! Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "user",
      content: "Je veux faire une demande de certificat de résidence",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "assistant",
      content:
        "Très bien, vous voulez faire une demande de certificat de résidence ! Pour cela, vous devez fournir les documents suivants :\n\n- Une pièce d'identité valide\n- Un justificatif de domicile récent\n- Le formulaire de demande rempli\n\nSouhaitez-vous que je vous télécharge maintenant ?",
      timestamp: new Date(),
    },
    {
      id: "4",
      type: "user",
      content: "Oui bien, pouvez-vous me dire le prix maintenant ?",
      timestamp: new Date(),
    },
    {
      id: "5",
      type: "assistant",
      content:
        "Pour un certificat de résidence, il faut faire !\n\n- Une pièce d'identité valide (CNI ou passeport)\n- Un justificatif de domicile récent (facture d'eau, d'électricité ou de téléphone de moins de 3 mois)\n- Le formulaire de demande dûment rempli et signé\n\nSouhaitez-vous que je vous télécharge maintenant ?",
      timestamp: new Date(),
    },
    {
      id: "6",
      type: "user",
      content: "Quels documents faut-il ?",
      timestamp: new Date(),
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: newMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content:
            "Je vous remercie pour votre question. Je vais vous aider avec les informations nécessaires pour votre demande.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }, 1000)
    }
  }

  return (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 md:ml-64 p-4 md:p-8">
            {/* Header */}
            <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Aide & Assistant</h1>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
          <User className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col shadow-sm border-gray-200">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "assistant" && (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-2xl p-4 rounded-2xl shadow-sm ${
                    message.type === "user" ? "bg-blue-600 text-white ml-12" : "bg-gray-100 text-gray-900 mr-12"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>

                {message.type === "user" && (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex gap-3">
              <Input
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-12 border-gray-300 rounded-xl px-4"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-xl shadow-sm"
              >
                <Send className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 px-6 h-12 rounded-xl bg-transparent"
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
          </div>
        </div>
   
  )
}
