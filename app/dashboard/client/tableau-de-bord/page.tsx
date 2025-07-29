"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  FileText,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function TableauDeBordPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6));
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const demandes = [
    {
      id: "1",
      type: "Certificat de résidence",
      numero: "LMJ-5-007",
      statut: "Terminé",
      dateEnvoi: "20/05/2024",
    },
    {
      id: "2",
      type: "Carte de commerçant",
      numero: "JAH-6-022",
      statut: "Terminé",
      dateEnvoi: "12/04/2024",
    },
  ];

  const messages = [
    {
      id: "1",
      titre: "Invitation à l'Assemblée Citoyenne du 10/08",
      date: "01/08/2024",
      isRead: false,
    },
    {
      id: "2",
      titre: "Invitation à l'Assemblée Citoyenne du 10/08",
      date: "01/08/2024",
      isRead: false,
    },
    {
      id: "3",
      titre: "Invitation à l'Assemblée Citoyenne du 10/08",
      date: "01/08/2024",
      isRead: true,
    },
  ];

  const rendezVous = [
    {
      id: "1",
      date: "12/08 - 14h00-15h",
      titre: "citoyen personnalisé",
    },
    {
      id: "2",
      date: "12/08 - 14h00-15h",
      titre: "citoyen personnalisé",
    },
    {
      id: "3",
      date: "12/08 - 14h00-15h",
      titre: "citoyen personnalisé",
    },
  ];

  const infosMailrie = [
    {
      titre: "Maintenance portail",
      description: "Le 7 juin — accès",
    },
    {
      titre: "Fête citoyenne du Plateau",
      description: "10 juin à 18h, Place des Fêtes",
    },
    {
      titre: "Fête citoyenne du Plateau",
      description: "10 juin à 18h, Place des Fêtes",
    },
  ];

  const handleNewDemande = () => {
    console.log("Nouvelle demande créée");
  };

  const handleChangePassword = () => {
    console.log("Changement de mot de passe");
  };

  const handleSuivreDossiers = () => {
    console.log("Suivi des dossiers");
  };

  const handleReadMessage = (messageId: string) => {
    console.log(`Message ${messageId} lu`);
  };

  const handlePlanifierRdv = (rdvId: string) => {
    console.log(`Planifier RDV ${rdvId}`);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const days = generateCalendar();

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Mon espace citoyen
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <User className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="xl:col-span-3 space-y-6 md:space-y-8">
            {/* Informations citoyennes */}
            <Card className="shadow-sm bg-gray-100 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-3xl font-bold text-orange-600">
                  Informations citoyennes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-6">
                  <Avatar className="w-16 md:w-40 h-16 md:h-40 border-4 border-gray-200 mx-auto lg:mx-0">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg md:text-xl font-semibold bg-blue-100 text-blue-600">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-bold text-lg md:text-2xl text-gray-900 mb-1">
                      Awa Coulibaly
                    </h3>
                    <div className="space-y-1 text-lg text-gray-600 mb-4">
                      <p>
                        <span className="font-medium text-lg">Quartier :</span>{" "}
                        Plateau Dokui
                      </p>
                      <p>
                        <span className="font-medium text-lg">E-mail :</span>{" "}
                        awa.coulibaly@gmail.com
                      </p>
                      <p>
                        <span className="font-medium">Téléphone :</span> +225 07
                        88 46 67 23
                      </p>
                      <p>
                        <span className="font-medium">Statut du compte :</span>{" "}
                        Vérifié
                      </p>
                    </div>
                    <Button
                      className=" text-white bg-primary text-lg font-medium hover:bg-primary mb-4  transition-colors duration-200"
                      onClick={handleChangePassword}
                    >
                      <span className="text-white">
                        {" "}
                        Changer mon mot de passe
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-8 flex items-center justify-center">
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <Button
                className="bg-primary hover:bg-primary font-medium text-lg text-white px-4 py-2 transition-colors duration-200"
                onClick={handleNewDemande}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle demande
              </Button>
              <Button
                variant="outline"
                className="border-orange-400 text-orange-600 hover:bg-orange-400 text-lg transition-colors duration-200"
              >
                <FileText className="w-4 h-4 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button
                className="bg-secondary  hover:bg-secondary text-white font-medium text-lg transition-colors duration-200"
                onClick={handleSuivreDossiers}
              >
                <Eye className="w-4 h-4 mr-2" />
                Suivre mes dossiers
              </Button>
            </div>
            {/* Prochains rendez-vous */}
          </div>
          
        </div>
        <div className="xl:col-span-3 w-full">
            {/* Mes dernières demandes */}
            <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg md:text-3xl font-bold text-primary">
                    Mes dernières demandes
                  </CardTitle>
                  <Link
                    href="/mes-demandes"
                    className="text-primary hover:text-primary text-lg font-medium transition-colors duration-200"
                  >
                    Voir tout
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
                          Type de service
                        </th>
                        <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg hidden sm:table-cell">
                          Numéro
                        </th>
                        <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
                          Statut
                        </th>
                        <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg hidden md:table-cell">
                          Date d'envoi
                        </th>
                        <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((demande) => (
                        <tr
                          key={demande.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-4 md:px-6 font-medium text-gray-900 text-lg">
                            {demande.type}
                          </td>
                          <td className="py-4 px-4 md:px-6 text-gray-600 text-lg hidden sm:table-cell">
                            {demande.numero}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-lg">
                              {demande.statut}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-gray-600 text-lg hidden md:table-cell">
                            {demande.dateEnvoi}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <Link href={`/mes-demandes/${demande.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 bg-transparent text-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Voir
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Derniers messages reçus */}
            <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
                    Derniers messages reçus
                  </CardTitle>
                  <Button className="bg-secondary hover:bg-secondary text-white text-lg transition-colors duration-200">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Accéder à ma messagerie
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-3 transition-colors duration-200 ${
                        message.isRead
                          ? "border-gray-200 bg-gray-50"
                          : "border-blue-200 bg-blue-50"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-lg">
                          {message.titre}
                        </p>
                        <p className="text-md text-gray-500">{message.date}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-blue-50 bg-transparent transition-colors duration-200"
                        onClick={() => handleReadMessage(message.id)}
                      >
                        {message.isRead ? "Lu" : "Lire"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-gray-200 hover:shadow-md mt-7 transition-shadow duration-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
                  Prochains rendez-vous
                </CardTitle>
              </CardHeader>
              <div className="p-4 md:p-6 flex gap-7 w-full">
                {/* Mini Calendar */}
                <div className="mb-6 max-w-full border p-4 rounded-lg w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-lg">
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h4>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-gray-300 bg-transparent hover:bg-gray-50 transition-colors duration-200"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth() - 1
                            )
                          )
                        }
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-gray-300 bg-transparent hover:bg-gray-50 transition-colors duration-200"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth() + 1
                            )
                          )
                        }
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-lg">
                    {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
                      <div key={day} className="p-2 w-fit text-lg font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {days.map((day, index) => {
                      const isCurrentMonth =
                        day.getMonth() === currentDate.getMonth();
                      const isToday =
                        day.toDateString() === new Date().toDateString();
                      const hasEvent = day.getDate() === 12 && isCurrentMonth;

                      return (
                        <div
                          key={index}
                          className={`p-2 text-md w-fit cursor-pointer transition-colors duration-200 ${
                            !isCurrentMonth
                              ? "text-gray-300"
                              : isToday
                              ? "bg-blue-600 text-white rounded"
                              : hasEvent
                              ? "bg-green-500 text-white rounded"
                              : "text-gray-700 hover:bg-gray-100 rounded"
                          }`}
                        >
                          {day.getDate()}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rendez-vous list */}
                <div className="space-y-3 w-full">
                  {rendezVous.map((rdv) => (
                    <div
                      key={rdv.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-gray-200 rounded-lg gap-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-lg">
                          {rdv.date}
                        </p>
                        <p className="text-md text-gray-500">{rdv.titre}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-blue-50 text-lg bg-transparent transition-colors duration-200"
                        onClick={() => handlePlanifierRdv(rdv.id)}
                      >
                       
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-blue-50 text-lg bg-transparent transition-colors duration-200"
                        onClick={() => handlePlanifierRdv(rdv.id)}
                      >
                        <Trash2/>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Infos mairie & alertes citoyennes */}
            <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
                  Infos mairie & alertes citoyennes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 w-full">
                <div className="space-x-4 flex w-full">
                  {infosMailrie.map((info, index) => (
                    <div
                      key={index}
                      className="p-4 border w-full border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-900 text-xl mb-1">
                        {info.titre}
                      </h4>
                      <p className="text-lg text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
}
