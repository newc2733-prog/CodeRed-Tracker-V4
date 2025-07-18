import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { HeartPulse, Clock, FlaskConical, Package, Stethoscope, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeRedBanner from "@/components/code-red-banner";
import UserLogin from "@/components/user-login";
import type { CodeRedEvent, Pack } from "@shared/schema";

interface ActiveCodeRed extends CodeRedEvent {
  packs: Pack[];
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: activeCodeRed, isLoading, refetch } = useQuery<ActiveCodeRed | null>({
    queryKey: ["/api/code-red/active"],
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  const { data: allActiveCodeReds } = useQuery<ActiveCodeRed[]>({
    queryKey: ["/api/code-red/all-active"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", { 
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading CodeRed Tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HeartPulse className="text-red-600 text-2xl h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CodeRed Tracker</h1>
                <p className="text-sm text-gray-600">Barts NHS Trust</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Time</div>
              <div className="font-mono text-lg font-semibold">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Code Red Banner */}
      {activeCodeRed && (
        <CodeRedBanner 
          codeRed={activeCodeRed} 
          currentTime={currentTime}
          onRefetch={refetch}
        />
      )}

      {/* User Type Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Your Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lab Access */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <FlaskConical className="h-8 w-8 text-blue-600" />
                      Lab Dashboard
                    </CardTitle>
                    <p className="text-gray-600">Manage Code Red events and blood products</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/lab">
                      <Button className="w-full" size="lg">
                        <FlaskConical className="h-5 w-5 mr-2" />
                        Access Lab Dashboard
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Runner Access */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Package className="h-8 w-8 text-green-600" />
                      Runner Dashboard
                    </CardTitle>
                    <p className="text-gray-600">Select a Code Red event to manage blood product delivery</p>
                  </CardHeader>
                  <CardContent>
                    {allActiveCodeReds && allActiveCodeReds.length > 0 ? (
                      <div className="space-y-2">
                        {allActiveCodeReds.map((codeRed) => (
                          <Link key={codeRed.id} href={`/runner?codeRedId=${codeRed.id}`}>
                            <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                              <div className="flex flex-col items-start gap-1">
                                <div className="font-semibold">
                                  Code Red #{codeRed.id} - {codeRed.labType}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {codeRed.location} • {codeRed.packs.length} packs
                                </div>
                              </div>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No active Code Red events</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Clinician Access */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Stethoscope className="h-8 w-8 text-purple-600" />
                      Clinician Dashboard
                    </CardTitle>
                    <p className="text-gray-600">Select a Code Red event to monitor patient care</p>
                  </CardHeader>
                  <CardContent>
                    {allActiveCodeReds && allActiveCodeReds.length > 0 ? (
                      <div className="space-y-2">
                        {allActiveCodeReds.map((codeRed) => (
                          <Link key={codeRed.id} href={`/clinician?codeRedId=${codeRed.id}`}>
                            <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                              <div className="flex flex-col items-start gap-1">
                                <div className="font-semibold">
                                  Code Red #{codeRed.id} - {codeRed.labType}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {codeRed.location} • MRN: {codeRed.patientMRN}
                                </div>
                              </div>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Stethoscope className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No active Code Red events</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Code Red Summary */}
      {allActiveCodeReds && allActiveCodeReds.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Active Code Red Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allActiveCodeReds.map((codeRed) => {
                const formatTime = (date: Date) => {
                  return date.toLocaleTimeString("en-GB", { 
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  });
                };
                
                const calculateElapsed = (startTime: Date) => {
                  const now = new Date();
                  const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
                  const hours = Math.floor(elapsed / 60);
                  const minutes = elapsed % 60;
                  
                  if (hours > 0) {
                    return `${hours}h ${minutes}m`;
                  }
                  return `${minutes}m`;
                };

                return (
                  <Card key={codeRed.id} className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="font-semibold text-red-800">Code Red #{codeRed.id}</span>
                        </div>
                        <span className="text-xs text-red-600 font-medium">
                          {calculateElapsed(new Date(codeRed.activationTime))}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">{codeRed.labType}</span> - {codeRed.location}</div>
                        <div className="text-gray-600">Patient: {codeRed.patientMRN}</div>
                        <div className="text-gray-600">Activated: {formatTime(new Date(codeRed.activationTime))}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{codeRed.packs.length} packs</span>
                          <div className="flex gap-1">
                            {codeRed.assignedRunnerId && (
                              <div className="w-2 h-2 rounded-full bg-green-500" title="Runner assigned"></div>
                            )}
                            {codeRed.assignedClinicianId && (
                              <div className="w-2 h-2 rounded-full bg-purple-500" title="Clinician assigned"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">
        {!activeCodeRed && !allActiveCodeReds?.length && (
          <div className="text-center py-12">
            <HeartPulse className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Code Red</h2>
            <p className="text-gray-600 mb-6">To activate a Code Red, please go to the Lab view</p>
            <Button asChild size="lg">
              <Link href="/lab">
                <FlaskConical className="h-4 w-4 mr-2" />
                Go to Lab View
              </Link>
            </Button>
          </div>
        )}


      </main>
    </div>
  );
}
