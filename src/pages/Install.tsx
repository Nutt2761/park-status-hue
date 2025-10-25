import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Download, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">ติดตั้งแอป Smart Parking</CardTitle>
          <CardDescription>
            ติดตั้งแอปลงในมือถือของคุณเพื่อการใช้งานที่สะดวกยิ่งขึ้น
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInstalled ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="text-lg font-medium">แอปถูกติดตั้งแล้ว!</p>
              <Button onClick={() => navigate("/")} className="w-full">
                กลับไปยังหน้าหลัก
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  ขั้นตอนการติดตั้ง
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>กดปุ่ม "ติดตั้งแอป" ด้านล่าง</li>
                  <li>หรือใน Safari/Chrome: เมนู → เพิ่มไปยังหน้าจอหลัก</li>
                  <li>แอปจะปรากฏบนหน้าจอโฮมของคุณ</li>
                  <li>ใช้งานได้แม้ไม่มีอินเทอร์เน็ต</li>
                </ul>
              </div>

              {deferredPrompt && (
                <Button onClick={handleInstall} className="w-full gap-2" size="lg">
                  <Download className="w-5 h-5" />
                  ติดตั้งแอปตอนนี้
                </Button>
              )}

              <Button 
                onClick={() => navigate("/")} 
                variant="outline" 
                className="w-full"
              >
                ใช้งานในเบราว์เซอร์
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;