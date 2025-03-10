"use client";
import MemoryGame from "@/components/games/memory-game";
import { myData } from "@/constants/data";
import { socialLink } from "@/constants/data";
import { useScreenSize } from "@/hooks/use-screen-size";
import Image from "next/image";
import Link from "next/link";
export default function Hello() {
  const { isSmallerThan } = useScreenSize();
  return (
    <div className="container relative  border-x border-dotted  grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-center w-full h-full">
      <Image
        src="/assets/hello_page/green.svg"
        width={800}
        height={700}
        className="z-50 absolute select-none pointer-events-none object-cover
         -right-[100px] -top-[100px]"
        alt="effective-image-1"
      />
      <Image
        src="/assets/hello_page/blue.svg"
        width={800}
        height={700}
        className="z-50 absolute select-none pointer-events-none object-cover
         bottom-[100px]
         md:-bottom-[200px] md:right-0"
        alt="effective-image-1"
      />
      <div>
        <div className="mb-7">
          <h5 className="mb-2 text-white">Hi all . I am</h5>
          <h1 className="text-5xl mb-2 text-white">
            {myData.fullName.firstName} {myData.fullName.lastName}
          </h1>
          <h2 className="text-main text-3xl">{">"} Front-end developer</h2>
        </div>

        {data.map((item) => {
          return (
            <div key={item.key} className="mb-2 text-sm sm:text-lg">
              <p className="text-white/50">
                {"// "}
                {item.commit}
              </p>
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-teal-500">{item.variableName}</span> ={" "}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:underline text-nowrap"
                >
                  <span>{` "${item.value}"`}</span>
                </Link>
              </p>
            </div>
          );
        })}
      </div>
      {/* {!isSmallerThan("lg") && <MemoryGame />} */}
    </div>
  );
}

const data = [
  {
    key: "myNumber",
    commit: "my nummber",
    variableName: "telephoneNum",
    value: myData.phone.number,
    link: `tel:${myData.phone.code}${myData.phone.number.replace(/\s+/g, "")}`,
  },
  {
    key: "email",
    commit: "my email",
    variableName: "email",
    value: myData.email,
    link: `mailto:${myData.email}`,
  },
  {
    key: "githubLink",
    commit: "you can also see it on my github page",
    variableName: "githubLink",
    value: socialLink.github.url,
    link: socialLink.github.url,
  },
  {
    key: "linkedin",
    commit: "you can  check may Linkedin page",
    variableName: "linkedin",
    value: socialLink.linkedin.url,
    link: socialLink.linkedin.url,
  },
  {
    key: "telegram",
    commit: "you can message me",
    variableName: "telegram",
    value: socialLink.telegram.url,
    link: socialLink.telegram.url,
  },
];
