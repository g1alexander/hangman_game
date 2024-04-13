"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

import Button from "@/components/Button";
import SelectableCategory from "@/components/SelectableCategory";

import { categories } from "@/helpers/categories";

import PickACategoryImage from "@public/images/pick_a_category.svg";
import Back from "@public/images/icon-back.svg";
import { GameContext } from "@/context/GameContext";
import { useContext, createRef } from "react";

export default function PickACategory() {
  const router = useRouter();
  const { setCategory, setCaptchaCode } = useContext(GameContext);
  const recaptchaRef = createRef<ReCAPTCHA>();

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    if (!captchaCode) return;

    setCaptchaCode(captchaCode);

    router.push(`/game`);
    recaptchaRef.current?.reset();
  };

  const handleSubmit = (query: string) => {
    recaptchaRef.current?.execute();
    setCategory(query);
  };

  return (
    <main className="container-2">
      <header className="grid-header">
        <Button onClick={() => router.push("/")} color="btn-navigation">
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
          <SelectableCategory key={index} onClick={() => handleSubmit(query)}>
            {name}
          </SelectableCategory>
        ))}
      </section>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        onChange={onReCAPTCHAChange}
      />
    </main>
  );
}
