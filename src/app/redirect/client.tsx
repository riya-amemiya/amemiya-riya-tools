"use client";

import { shorten } from "@/actions/shorten";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RedirectHomeClient = async () => {
  return (
    <form action={shorten} className="text-center w-full">
      <Input className="w-full" name="url" required={true} />
      <Button className="mt-4">Create</Button>
    </form>
  );
};
