import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../../public/images/logo.svg";

export default function Header() {
  const { asPath } = useRouter();

  return (
    <header className="h-36 minHeader:h-24 border-b border-b-solid border-b-gray-200 bg-gray-700">
      <div className="flex flex-col minHeader:flex-row max-w-6xl h-full minHeader:my-0 mx-auto py-2 px-0 minHeader:py-0 minHeader:px-6 items-center justify-normal minHeader:justify-between">
        <div className="flex flex-col minHeader:flex-row h-full items-center gap-7 minHeader:gap-16">
          <Link href={"/"}>
            <Image
              width={300}
              height={300}
              className="cursor-pointer"
              src={logo}
              alt="Sujeito Programador Logo"
            />
          </Link>

          <nav className="flex flex-row justify-between min-w-[350px] h-full items-center">
            {[
              { texto: "Home", href: "/" },
              { texto: "Conteúdos", href: "/posts" },
              { texto: "Quem somos?", href: "/sobre" },
            ].map((element) => (
              <Link
                key={element.href}
                href={element.href}
                className={`${
                  asPath.substring(0, 6) === element.href
                    ? "active"
                    : "hover:text-white hover:duration-300 text-gray-100"
                } `}
              >
                {element.texto}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <button className="bg-blue-900 h-8 uppercase font-semibold py-0 px-6 rounded-md hover:brightness-110 hover:duration-300 hidden minHeader:block">
            Começar
          </button>
        </div>
      </div>
    </header>
  );
}
