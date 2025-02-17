"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useLoginForm } from "@/hooks/authForm";
import Message from "@/app/components/authComponents/message";
import { Checkbox } from "./ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    formData,
    errors,
    isLoading,
    message,
    messageType,
    handleInputChange,
    handleSubmit,
  } = useLoginForm();
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Zaloguj się</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Podaj swój adres email poniżej, aby się zalogować.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Hasło</Label>
            <a
              href="/autoryzacja/prosba"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Nie pamiętasz hasła?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="************"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="items-top flex space-x-2">
            <input
              type="checkbox"
              name="rememberMe"
              className="mr-2"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Zapamiętaj mnie
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </Button>
        {message && <Message message={message} type={messageType} />}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Lub kontynuuj
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Zaloguj się przez Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Nie masz konta?{" "}
        <a href="/autoryzacja/rejestracja" className="underline underline-offset-4">
          Zarejestruj się
        </a>
      </div>
    </form>
  );
}
