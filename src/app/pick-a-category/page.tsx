"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import SelectableCategory from "@/components/SelectableCategory";

import { categories } from "@/helpers/categories";

import PickACategoryImage from "@public/images/pick_a_category.svg";
import Back from "@public/images/icon-back.svg";

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
        {categories.map(({ name, query }, index) => (
          <SelectableCategory
            key={index}
            onClick={() => router.push(`/game?category=${query}`)}
          >
            {name}
          </SelectableCategory>
        ))}
      </section>
    </main>
  );
}
