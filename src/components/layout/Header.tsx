import Link from 'next/link';
import { Palette, Home, Users, Sparkles, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
            <Palette className="h-8 w-8 text-accent" />
            <span>Artisan Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <Home className="mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/artists">
                  <Users className="mr-2" />
                  Artists
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/style-suggestion">
                  <Sparkles className="mr-2" />
                  Style Finder
                </Link>
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <LayoutDashboard className="mr-2" />
                  Dashboard
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose Your Dashboard</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/customer">
                    <UserCircle className="mr-2" />
                    <span>Customer Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/artist">
                    <Palette className="mr-2" />
                    <span>Artist Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
