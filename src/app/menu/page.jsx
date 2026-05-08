"use server";

import SearchBar from "@/components/Menu/SearchBar";
import MenuList from "@/components/MenuList";

export default function Page() {
  return (
    <div>
      <MenuList />
    </div>
  );
}

export default async function Menu() {
  return (
    <>
      <SearchBar />
    </>
  );
}
