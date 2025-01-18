import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center max-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center">
            <CalendarClock className="mr-2 h-8 w-8" />
            Coming Soon
          </CardTitle>
          <CardDescription className="text-center">
            Event registration will be available shortly
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-4">
            We&apos;re working hard to open registrations for this event. Please
            check back soon!
          </p>
          <p className="text-sm text-muted-foreground">
            In the meantime, you can explore other events or check out our
            latest updates.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
