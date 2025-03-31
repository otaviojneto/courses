"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/REfect/dropdown-menu";
import { useCourseStore } from "@/stores/CourseStore";
import { getInitials } from "@/utils/getInitials/getInitials";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useCourseStore();

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full z-50">
      <div className="container flex items-center justify-between relative">
        <Link href="/courses">
          <Image
            src="/icons/brandPermaneo.svg"
            alt="Home"
            width={40}
            height={40}
            className="hover:opacity-80 transition-opacity bg-[#0F172A] p-1 rounded-full"
          />
        </Link>

        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className={`flex items-center gap-2 outline-none px-3 py-1 rounded-3xl transition-colors
    ${isOpen ? "bg-gray-100 " : "hover:bg-gray-100"}`}
          >
            <div className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-medium">
              {getInitials(user.name)}
            </div>

            <span className="font-medium text-gray-700">{user.name}</span>

            <Image
              src="/icons/chevronDown.svg"
              alt="Home"
              width={12}
              height={12}
              className={`transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full text-base">
                Favoritos
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
