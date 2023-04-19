import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

import techsImage from "../../public/images/techs.svg";
import MainContainer from "@/components/MainContainer";

import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

interface Conteudo {
  titulo: string;
  subtitulo: string;
  linkAcao: string;

  tituloMobile: string;
  conteudoMobile: string;
  fotoMobile: string;

  tituloWeb: string;
  conteudoWeb: string;
  fotoWeb: string;
}

interface HomeProps {
  conteudo: Conteudo;
}

export default function Home({ conteudo }: HomeProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Gabriel Holanda</title>
      </Head>
      <MainContainer classe="justify-between">
        <div className="flex min-[950px]:flex-row flex-col items-center">
          <section className="flex flex-col max-w-xl mt-8 xl:mt-0">
            <h1 className="text-4xl leading-[3rem] font-bold xl:leading-[4.5rem] xl:text-6xl">
              {conteudo.titulo}
            </h1>
            <span className="text-base leading-9">{conteudo.subtitulo}</span>
            <a href={conteudo.linkAcao}>
              <button className="mt-10 bg-blue-900 w-full min-[950px]:w-fit  h-12 uppercase font-semibold px-10 rounded-md hover:brightness-110 hover:duration-300">
                Começar agora!
              </button>
            </a>
          </section>
          <img
            className="max-w-[640px]"
            src="/images/conteudos.png"
            alt="Diversas imagens de cursos"
          />
        </div>

        <hr className="w-[calc(100vw-17px)] text-white h-1" />

        <div className="flex items-center justify-center max-w-6xl my-[5.5rem] mx-auto min-[950px]:flex-row flex-col">
          <section className="max-w-2xl">
            <h2 className="text-3xl leading-[3rem] font-bold xl:text-4xl xl:leading-[4.5rem]">
              {conteudo.tituloMobile}
            </h2>
            <span className="text-base leading-9">
              {conteudo.conteudoMobile}
            </span>
          </section>
          <img
            src={conteudo.fotoMobile}
            className="max-w-[550px] mt-5 xl:mt-0"
            alt="Foto de um aplicativo em 2 smartphones"
          />
        </div>

        <hr className="w-[calc(100vw-17px)] text-white h-1" />

        <div className="flex items-center justify-center max-w-6xl my-[5.5rem] mx-auto min-[950px]:flex-row flex-col">
          <img
            src={conteudo.fotoWeb}
            className="max-w-[550px]"
            alt="Uma aplicação em diversos dispositivos"
          />
          <section className="max-w-2xl">
            <h2 className="text-3xl mt-5 leading-[3rem] font-bold xl:mt-0 xl:text-4xl xl:leading-[4.5rem]">
              {conteudo.tituloWeb}
            </h2>
            <span className="text-base leading-9">{conteudo.conteudoWeb}</span>
          </section>
        </div>

        <div className="flex flex-col justify-between items-start max-w-6xl my-24 mx-auto">
          <Image
            quality={100}
            src={techsImage}
            height={100}
            width={300}
            alt="Tecnologias"
          />
          <h2 className="text-4xl leading-[3rem] font-bold xl:leading-[4.5rem] xl:text-[2.8rem]">
            Mais de <span className="text-blue-900">15 mil</span> já levaram sua
            carreira ao próximo nivel.
          </h2>
          <span className="text-base leading-9">
            E você vai perder a chance de evoluir de uma vez por todas?
          </span>
          <a href={conteudo.linkAcao}>
            <button className="mt-10 bg-blue-900 h-12 uppercase font-semibold px-10 rounded-md hover:brightness-110 hover:duration-300">
              Acessar turma
            </button>
          </a>
        </div>
      </MainContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);

  const {
    titulo,
    subtitulo,
    link_acao: linkAcao,
    titulo_mobile: tituloMobile,
    conteudo_mobile: conteudoMobile,
    foto_mobile: fotoMobile,
    titulo_web: tituloWeb,
    conteudo_web: conteudoWeb,
    foto_web: fotoWeb,
  } = res.results[0].data;

  return {
    props: {
      conteudo: {
        titulo: RichText.asText(titulo),
        subtitulo: RichText.asText(subtitulo),
        linkAcao: linkAcao.url,
        tituloMobile: RichText.asText(tituloMobile),
        conteudoMobile: RichText.asText(conteudoMobile),
        fotoMobile: fotoMobile.url,
        tituloWeb: RichText.asText(tituloWeb),
        conteudoWeb: RichText.asText(conteudoWeb),
        fotoWeb: fotoWeb.url,
      },
    },
    revalidate: 60 * 2,
  };
};
