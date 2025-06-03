"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileValidator } from "./ProfileValidator";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";

export default function DashboardHeader() {
  const router = useRouter();
  const { logout} = useAuth();
  const [isModel, setIsModel] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleModel = () => {
    setIsModel(!isModel);
  };

  const hangleLogout = async () => {
 
logout();
  router.push("/login");
};


  return (
    <>
      <header className="flex flex-none overflow-hidden w-full px-2 py-2 justify-between border border-gray-200">
        <div className="flex gap-2 items-center">
          <img
            src="/Logo.png"
            className="mr-3 h-14"
            alt="Kirat IT Solution"
            title="Kirat IT Solution"
          />
        </div>
        <div className="flex gap-2 items-center">
          {/* <Switch checked={isDark} onCheckedChange={setIsDark}/> */}
          {/* <Popover >
          <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
             
            </ul>
            <div className="py-2">
              <button
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left "
                onClick={logout}
              >
                Log out
              </button>
            </div>
          </PopoverContent>
        </Popover> */}
          {/* <ProfileValidator/> */}
        </div>
        <Button
          className="block px-4 py-2   text-left hover:bg-red-500 "
          onClick={hangleLogout}
        >
          Log out
        </Button>
      </header>
    </>
  );
}
