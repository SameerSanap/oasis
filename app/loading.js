import React from "react";
import Spinner from "./_components/Spinner";

export default function loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
    </div>
  );
}
