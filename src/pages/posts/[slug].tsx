import MainContainer from "@/components/MainContainer";
import { getPrismicClient } from "@/services/prismic";

import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { RichText } from "prismic-dom";

interface PostProps {
  post: {
    titulo: string;
    descricao: string;
    capa: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  const { capa, titulo, descricao, updatedAt: data } = post;
  return (
    <>
      <Head>
        <title>{post?.titulo}</title>
      </Head>
      <MainContainer classe="justify-center mb-8">
        <article className="post">
          <Image
            src={capa}
            alt={titulo}
            width={720}
            height={410}
            quality={100}
            placeholder="blur"
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMjIqtBwADtQGRF1TM8QAAAABJRU5ErkJggg=="
            }
            className="max-w-full max-h-[410px] bg-gradient-to-b from-blue-900 to-transparent rounded-md"
          />
          <div className="conteudo-post">
            <h1 className="text-[2rem] font-bold leading-snug">{titulo}</h1>
            <time className="text-sm text-gray-200">{data}</time>
            <div
              dangerouslySetInnerHTML={{ __html: descricao }}
              className="text-sm text-gray-100 leading-6"
            ></div>
          </div>
        </article>
      </MainContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient(req);
  const res = await prismic.getByUID("post", String(slug), {});

  if (!res) {
    return {
      redirect: {
        destination: "/posts",
        permanent: false,
      },
    };
  }

  const post = {
    titulo: RichText.asText(res.data?.titulo),
    descricao: RichText.asHtml(res.data?.descricao),
    capa: res.data?.capa?.url,
    updatedAt: new Date(res.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return {
    props: {
      post,
    },
  };
};
