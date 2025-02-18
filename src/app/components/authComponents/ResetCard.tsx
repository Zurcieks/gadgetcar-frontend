import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent } from "@/app/components/ui/tabs";
import { useResetPassword } from "@/hooks/useAuthForm";

export function ResetCard() {
  const {
    handleSubmit,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  } = useResetPassword();

  return (
    <Tabs defaultValue="password" className="w-[400px]">
 

      <TabsContent value="password">
        <Card className="  ">
          <CardHeader>
            <CardTitle className=" flex justify-center text-3xl">Resetowanie hasła</CardTitle>
            <CardDescription className="flex justify-center text-center font-extralight text-lg ">
              Zmien swoje hasło. Po zmianie zostaniesz wylogowany.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="mt-10">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="block text-md font-medium  mb-2"
                >
                  Podaj hasło
                </Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Wpisz nowe hasło"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="block text-md font-medium mb-2"
                >
                  Potwierdź hasło
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confi	rmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Potwierdź nowe hasło"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Zmień hasło
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
