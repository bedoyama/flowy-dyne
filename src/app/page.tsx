import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center px-4 py-16">
      <main className="flex w-full max-w-md flex-col gap-6">
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Flowly
          </p>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight">
            Ship projects, one task at a time
          </h1>
          <p className="text-muted-foreground">
            MVP scaffold with Next.js, Tailwind, and shadcn/ui. Auth and data
            come next (C04–C05).
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>UI kit smoke test</CardTitle>
            <CardDescription>
              Button, Card, and Input from{" "}
              <code className="text-xs">components/ui</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              placeholder="Try typing here…"
              aria-label="Smoke test input"
            />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button type="button">Primary</Button>
            <Button type="button" variant="outline">
              Outline
            </Button>
            <Button type="button" variant="secondary">
              Secondary
            </Button>
          </CardFooter>
        </Card>

        <p className="text-muted-foreground text-center text-xs">
          Roadmap: <span className="font-medium">docs/ROADMAP.md</span> ·
          current commit: <span className="font-medium">C03</span>
        </p>
      </main>
    </div>
  );
}
