"use client";

import Link from "next/link";

export default function Home() {
  const username = sessionStorage.getItem("username");

  return (
    <div>
      <div>{username}</div>
      <Link href="/match?id=00000">match</Link>
    </div>
  );
}
