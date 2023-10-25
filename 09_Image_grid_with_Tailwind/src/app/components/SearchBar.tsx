"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/results/${search}`);
    setSearch("");
  };

  return (
    <form
      className="flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search"
        className="bg-white p-3 w-[230px] sm:w-80 text-xl rounded-xl text-black"
      />
    </form>
  );
}
