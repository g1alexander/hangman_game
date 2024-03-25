"use client";

import Image from "next/image";
import PickACategoryImage from "@public/images/pick_a_category.svg";
import Back from "@public/images/icon-back.svg";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import SelectableCategory from "@/components/SelectableCategory";

export default function PickACategory() {
  const router = useRouter();

  return (
    <main className="container-2">
      <header className="grid-header">
        <Button onClick={() => router.back()} color="btn-navigation">
          <Image src={Back} alt="back" width={20} height={40} priority />
        </Button>
        <Image
          src={PickACategoryImage}
          alt="HowToPlay"
          width={200}
          height={200}
          className="grid-header-title"
        />
      </header>
      <section className="grid-category">
        <SelectableCategory onClick={() => router.push("/game")}>
          movies
        </SelectableCategory>
        <SelectableCategory onClick={() => router.push("/game")}>
          tv shows
        </SelectableCategory>
        <SelectableCategory onClick={() => router.push("/game")}>
          countries
        </SelectableCategory>
        <SelectableCategory onClick={() => router.push("/game")}>
          capital cities
        </SelectableCategory>
        <SelectableCategory onClick={() => router.push("/game")}>
          animals
        </SelectableCategory>
        <SelectableCategory onClick={() => router.push("/game")}>
          sports
        </SelectableCategory>
      </section>
    </main>
  );
}
