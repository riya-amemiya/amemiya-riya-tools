import { Card, CardContent } from "@/components/ui/card";

import { LoginPageClient } from "./client";

const LoginPage = () => {
  return (
    <Card className="max-w-screen-xl bg-slate-50 rounded-xl shadow-md w-full md:p-10 p-6">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <LoginPageClient />
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginPage;
