"use client";

import Link from "next/link";
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
export default function post({ data: post }: { data: Post }) {
  return (
    <>
      <li
        key={post.id}
        className="rounded-md border border-gray-800 p-4 text-lg font-medium duration-200 ease-in-out hover:border-gray-700 hover:font-semibold hover:text-gray-400 hover:underline"
      >
        <Link href={`/${post.id}`}>{post.title}</Link>
      </li>
    </>
  );
}
