import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock de dados do usuário (substitua pelo seu próprio contexto ou auth)
const user = {
  name: "John Doe",
  email: "john@example.com",
};

const Nav: React.FC = () => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full z-50">
      <div className="container flex items-center justify-between relative">
        <Link href="/courses">
          <Image
            src="/brandPermaneo.svg"
            alt="Home"
            width={40}
            height={40}
            className="hover:opacity-80 transition-opacity bg-[#0F172A] p-1 rounded-full"
          />
        </Link>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              <div className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-medium">
                {getInitials(user.name)}
              </div>

              <span className="font-medium text-gray-700">{user.name}</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40">
              <DropdownMenuItem>
                <Link href="/courses" className="w-full">
                  Cursos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites" className="w-full">
                  Favoritos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
