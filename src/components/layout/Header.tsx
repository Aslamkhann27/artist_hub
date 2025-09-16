"use client";

import Link from 'next/link';
import { Palette, Home, Users, Sparkles, LayoutDashboard, UserCircle, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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
                  <Home />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/artists">
                  <Users />
                  Artists
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/style-suggestion">
                  <Sparkles />
                  Style Finder
                </Link>
              </Button>
            </nav>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <LayoutDashboard />
                    Dashboard
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose Your Dashboard</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/customer">
                      <UserCircle />
                      <span>Customer Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/artist">
                      <Palette />
                      <span>Artist Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
             {user ? (
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </Button>
              ) : (
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn />
                    Login
                  </Link>
                </Button>
              )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
