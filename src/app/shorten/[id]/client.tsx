"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export const ShortenCreatedClient = () => {
  const parameters = useParams<{ id: string }>();
  return (
    <div>
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}r/${parameters.id}`}
        rel="noopener"
        target="_blank"
      >
        {`${process.env.NEXT_PUBLIC_URL}r/${parameters.id}`}
      </Link>
    </div>
  );
};
