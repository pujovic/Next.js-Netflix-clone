import { signOut } from "next-auth/react";
import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

interface Props {
  visible?: boolean;
}

function AccountMenu({ visible }: Props) {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-48 absolute top-8 right-[-15px] py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            width={320}
            height={320}
            className="w-8 rounded-md"
            src="/profile.png"
            alt="Account picture"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
}

export default AccountMenu;
