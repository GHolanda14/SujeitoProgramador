import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardProps {
  titulo: string;
  data: string;
  texto: string;
  id: string;
  capa: string;
}

export default function CardPost({ id, titulo, data, texto, capa }: CardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="group flex flex-col max-w-2xl self-center mt-14"
    >
      <Image
        src={capa}
        alt={titulo}
        width={720}
        height={420}
        quality={100}
        placeholder="blur"
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMjIqtBwADtQGRF1TM8QAAAABJRU5ErkJggg=="
        }
        className="max-w-full max-h-[410px] bg-gradient-to-b from-blue-900 to-transparent rounded-md"
      />
      <div className="flex flex-col mt-5 gap-2">
        <h2 className="text-xl font-bold leading-8 group-hover:text-blue-900 group-hover:brightness-110 group-hover:duration-200">
          {titulo}
        </h2>
        <time className="text-sm text-gray-200">{data}</time>
        <p className="text-sm text-gray-100 leading-6">{texto}</p>
      </div>
    </Link>
  );
}
