"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  const activeButton = searchParams.get("capacity") ?? "all";

  return (
    <div className="border border-primary-800 flex">
      <Button
        handleFilter={handleFilter}
        filter="all"
        activeButton={activeButton}
      >
        All guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="small"
        activeButton={activeButton}
      >
        1&mdash; 3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="medium"
        activeButton={activeButton}
      >
        4&mdash; 7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeButton={activeButton}
      >
        8&mdash; 12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, children, activeButton }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeButton === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
