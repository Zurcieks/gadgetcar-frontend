import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { requestResetPassword } from "@/hooks/authForm";

export function RequestCard() {
  const { handleSubmit, email, setEmail } = requestResetPassword();

  return (
    <Tabs defaultValue="account" className="flex  w-[400px] h-96 mx-auto mt-12">
      <TabsContent value="account">
        <Card className="p-6 ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold ">
              Prośba o zresetowanie hasła
            </CardTitle>
            <CardDescription className="text-md font-extralight py-2 ">
              Podaj swój adres email, a wyślemy Ci link do resetowania hasła.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-9">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Wpisz swój adres email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Wyślij
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        
        </Card>
      </TabsContent>
    </Tabs>
  );
}
