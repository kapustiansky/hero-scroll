"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import hero from "@/assets/images/hero.jpg";
import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";
import img4 from "@/assets/images/img4.jpg";
import img5 from "@/assets/images/img5.jpg";
import img6 from "@/assets/images/img6.jpg";
import img7 from "@/assets/images/img7.jpg";
import img8 from "@/assets/images/img8.jpg";
import img9 from "@/assets/images/img9.jpg";
import img10 from "@/assets/images/img10.jpg";
import img11 from "@/assets/images/img11.jpg";
import img12 from "@/assets/images/img12.jpg";
import img13 from "@/assets/images/img13.jpg";
import img14 from "@/assets/images/img14.jpg";
import img15 from "@/assets/images/img15.jpg";
import img16 from "@/assets/images/img16.jpg";
import useLenis from "@/hooks/useLenis";

import cl from "./page.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const GALLERY_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
];

const INNER_FROM = 500;
const INNER_TO = -250;

const GALLERY_COLUMNS = [
  { id: 1, speed: 2, images: [1, 2, 3, 4] },
  { id: 2, speed: 1, images: [5, 6, 7, 8] },
  { id: 3, speed: 1, images: [9, 10, 11, 12] },
  { id: 4, speed: 2, images: [13, 14, 15, 16] },
].map((column) => ({
  ...column,
  from: INNER_FROM * column.speed,
  to: INNER_TO * column.speed,
}));

const Home = () => {
  useLenis();

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const subtitle = hero.querySelector<HTMLElement>(`.${cl.heroSubtitle}`);
      if (!subtitle) return;

      const split = new SplitText(subtitle, { type: "words" });
      gsap.set(subtitle, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          // "+=350%" use with combination of .about's margin-top
          end: "+=350%",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        `.${cl.heroTitleBox}`,
        { yPercent: -100, ease: "none", duration: 1 },
        0,
      )
        .fromTo(
          split.words,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.1,
            stagger: { amount: 0.65, from: "start" },
          },
          1,
        )
        .to(subtitle, { opacity: 0, duration: 0.1 }, 2.25)
        .fromTo(
          `.${cl.heroImg}`,
          {
            width: () => hero.clientWidth,
            height: () => hero.clientHeight,
            borderRadius: 0,
          },
          {
            width: 150,
            height: 150,
            borderRadius: 10,
            ease: "none",
            duration: 1,
          },
          2.5,
        );
    },
    { scope: heroRef },
  );

  useGSAP(
    () => {
      const about = aboutRef.current;
      if (!about) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(`.${cl.aboutCol}`).forEach((col, i) => {
        const { from, to } = GALLERY_COLUMNS[i];
        tl.fromTo(
          col,
          { y: from },
          { y: to, ease: "power1.out", duration: 1 },
          0,
        );
      });
    },
    { scope: aboutRef },
  );

  return (
    <main>
      <section className={cl.hero} ref={heroRef}>
        <div className={cl.heroImg}>
          <Image
            src={hero}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            preload
          />
        </div>
        <div className={cl.heroTitleBox}>
          <h1 className={cl.heroTitle}>
            A study of motion unfolding inside a single frame
          </h1>
        </div>
        <div className={cl.heroSubtitleBox}>
          <h2 className={cl.heroSubtitle}>
            The moment where stillness transforms into movement
          </h2>
        </div>
      </section>
      <section className={cl.about} ref={aboutRef}>
        <div className={cl.aboutGrid}>
          {GALLERY_COLUMNS.map((col) => (
            <div className={cl.aboutCol} key={col.id}>
              {col.images.map((i) => (
                <div className={cl.aboutImg} key={i}>
                  <Image
                    src={GALLERY_IMAGES[i - 1]}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 75px, 125px"
                  />
                </div>
              ))}
            </div>
          ))}
          <h3 className={cl.aboutTitle}>
            Fragments of motion and atmosphere gathered into a drifting
            collection of quiet visual moments.
          </h3>
        </div>
      </section>
      <section className={cl.outro}>
        <h3 className={cl.outroTitle}>
          The frame settles back into quiet stillness.
        </h3>
      </section>
    </main>
  );
};

export default Home;
