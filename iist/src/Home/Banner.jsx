import React from "react";
import bannerImage from "../images/2.webp"; // 👈 apna image path

export default function Banner() {
  return (
    <section className="relative w-full">
      <img
        src={bannerImage}
        alt="Skill Development Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
