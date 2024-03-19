"use client";

import Image from "next/image";
import PickACategoryImage from "@public/images/pick_a_category.svg";
import Back from "@public/images/icon-back.svg";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import SelectableCategory from "../components/SelectableCategory";

export default function PickACategory() {
  const router = useRouter();

  return (
    <main className="how-to-play">
      <header>
        <Button onClick={() => router.back()} color="btn-pink">
          <Image src={Back} alt="back" width={20} height={40} priority />
        </Button>
        <Image
          src={PickACategoryImage}
          alt="HowToPlay"
          width={200}
          height={200}
        />
      </header>
      <section className="grid-category">
        <SelectableCategory>movies</SelectableCategory>
        <SelectableCategory>tv shows</SelectableCategory>
        <SelectableCategory>countries</SelectableCategory>
        <SelectableCategory>capital cities</SelectableCategory>
        <SelectableCategory>animals</SelectableCategory>
        <SelectableCategory>sports</SelectableCategory>
      </section>
    </main>
  );
}
