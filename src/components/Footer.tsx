import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-muted-foreground">
            © 2025 Vercera 4.0
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          <span className="text-sm text-muted-foreground">
            Created by Web Development Team, AMURoboclub
          </span>
          {/* <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4 inline-block mr-1" />
            GitHub
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
