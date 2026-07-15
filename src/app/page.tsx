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
import { db } from "@/lib/db";

// DB smoke test should always hit Postgres at request time.
export const dynamic = "force-dynamic";

async function getDbStatus() {
  try {
    const [userCount, projectCount, taskCount] = await Promise.all([
      db.user.count(),
      db.project.count(),
      db.task.count(),
    ]);

    return {
      ok: true as const,
      userCount,
      projectCount,
      taskCount,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    return { ok: false as const, message };
  }
}

export default async function Home() {
  const dbStatus = await getDbStatus();

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
            Database layer is live (Prisma + PostgreSQL). Auth lands in C05.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Database smoke test</CardTitle>
            <CardDescription>
              Server Component query via{" "}
              <code className="text-xs">@/lib/db</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            {dbStatus.ok ? (
              <ul className="text-muted-foreground space-y-1">
                <li>
                  Status:{" "}
                  <span className="text-foreground font-medium">connected</span>
                </li>
                <li>
                  Users:{" "}
                  <span className="text-foreground font-medium">
                    {dbStatus.userCount}
                  </span>
                </li>
                <li>
                  Projects:{" "}
                  <span className="text-foreground font-medium">
                    {dbStatus.projectCount}
                  </span>
                </li>
                <li>
                  Tasks:{" "}
                  <span className="text-foreground font-medium">
                    {dbStatus.taskCount}
                  </span>
                </li>
              </ul>
            ) : (
              <p className="text-destructive">
                Could not reach the database: {dbStatus.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI kit</CardTitle>
            <CardDescription>shadcn primitives still available</CardDescription>
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
          current commit: <span className="font-medium">C04</span>
        </p>
      </main>
    </div>
  );
}
