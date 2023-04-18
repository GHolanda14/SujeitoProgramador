import MainContainer from "@/components/MainContainer";
import Head from "next/head";

import { GetStaticProps } from "next";

import Prismic from "@prismicio/client";
import { getPrismicClient } from "@/services/prismic";
import { RichText } from "prismic-dom";

import { FaYoutube, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

interface ConteudoProps {
  conteudo: {
    titulo: string;
    descricao: string;
    foto: string;
    facebook: string;
    youtube: string;
    instagram: string;
    linkedin: string;
  };
}

export default function Sobre({ conteudo }: ConteudoProps) {
  return (
    <>
      <Head>
        <title>Quem somos? | Sujeito programador</title>
      </Head>
      <MainContainer classe="justify-center">
        <section className="flex minHeader:flex-row gap-4 minHeader:gap-0 flex-col w-full justify-between items-center mb-8 laptop:mb-0 sm:min-h-[700px]">
          <div className="flex flex-col max-w-xl">
            <h1 className="my-10 mx-0 text-3xl xl:text-5xl font-bold">
              {conteudo.titulo}
            </h1>
            <p className="text-base leading-7 whitespace-pre-wrap">
              {conteudo.descricao}
            </p>
            <div className="flex flex-row mt-4 gap-4">
              <a
                href={conteudo.youtube}
                className="hover:text-blue-900 hover:duration-200"
              >
                <FaYoutube size={40} />
              </a>
              <a
                href={conteudo.facebook}
                className="hover:text-blue-900 hover:duration-200"
              >
                <FaFacebook size={40} />
              </a>
              <a
                href={conteudo.linkedin}
                className="hover:text-blue-900 hover:duration-200"
              >
                <FaLinkedin size={40} />
              </a>
              <a
                href={conteudo.instagram}
                className="hover:text-blue-900 hover:duration-200"
              >
                <FaInstagram size={40} />
              </a>
            </div>
          </div>
          <img
            className="max-w-[390px] lg:max-w-[490px]"
            src={conteudo.foto}
            alt="Sobre sujeito programador"
          />
        </section>
      </MainContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const res = await prismic.query([
    Prismic.Predicates.at("document.type", "sobre"),
  ]);

  const { titulo, descricao, foto, facebook, youtube, instagram, linkedin } =
    res.results[0]?.data;

  const conteudo = {
    titulo: RichText.asText(titulo),
    descricao: RichText.asText(descricao),
    foto: foto?.url,
    facebook: facebook?.url,
    youtube: youtube?.url,
    instagram: instagram?.url,
    linkedin: linkedin?.url,
  };

  return {
    props: {
      conteudo,
    },
    revalidate: 60 * 20,
  };
};
