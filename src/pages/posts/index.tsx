import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

import CardPost from "../../components/CardPost";
import MainContainer from "../../components/MainContainer";

import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { getPrismicClient } from "../../services/prismic";

type Post = {
  slug: string;
  titulo: string;
  descricao: string;
  capa: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
  page: number;
  totalPages: number;
}

export default function Posts({
  posts: postsBlog,
  page,
  totalPages,
}: PostsProps) {
  const [paginaAtual, setPaginaAtual] = useState(page);
  const [posts, setPosts] = useState(postsBlog || []);

  async function reqPost(pagina: number) {
    const prismic = getPrismicClient();

    const res = await prismic.query(
      [Prismic.Predicates.at("document.type", "post")],
      {
        orderings: "[document.last_publication_date_desc]",
        fetch: ["post.titulo", "post.descricao", "post.capa"],
        pageSize: 3,
        page: pagina.toString(),
      }
    );

    return res;
  }

  async function navegarPagina(pagina: number) {
    const res = await reqPost(pagina);

    if (res.results.length === 0) return;

    const getPosts = res.results.map((post) => {
      return {
        slug: post.uid,
        titulo: RichText.asText(post.data.titulo),
        descricao:
          post.data.descricao.find((conteudo) => conteudo.type === "paragraph")
            ?.text ?? "",
        capa: post.data.capa.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };
    });

    setPaginaAtual(pagina);
    setPosts(getPosts);
  }

  return (
    <>
      <Head>
        <title>Blog | Gabriel Holanda</title>
      </Head>
      <MainContainer>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <CardPost
              key={post.slug}
              titulo={post.titulo}
              texto={post.descricao}
              capa={post.capa}
              data={post.updatedAt}
              id={post.slug}
            />
          ))
        ) : (
          <h1>Não há posts!</h1>
        )}
        <div
          className={`flex flex-row w-full max-w-2xl my-10 ${
            paginaAtual >= 2 ? "justify-between" : "justify-end"
          }`}
        >
          {paginaAtual >= 2 && (
            <div className="flex flex-row gap-4">
              <FaAngleDoubleLeft
                className="bg-blue-900 p-2 rounded-md hover:cursor-pointer"
                size={40}
                onClick={() => navegarPagina(1)}
              />
              <FaAngleLeft
                className="bg-blue-900 p-2 rounded-md hover:cursor-pointer"
                size={40}
                onClick={() => navegarPagina(paginaAtual - 1)}
              />
            </div>
          )}
          {paginaAtual < Number(totalPages) && (
            <div className="flex flex-row gap-4">
              <FaAngleRight
                className="bg-blue-900 p-2 rounded-md hover:cursor-pointer"
                size={40}
                onClick={() => navegarPagina(paginaAtual + 1)}
              />
              <FaAngleDoubleRight
                className="bg-blue-900 p-2 rounded-md hover:cursor-pointer"
                size={40}
                onClick={() => navegarPagina(totalPages)}
              />
            </div>
          )}
        </div>
      </MainContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query(
    [Prismic.Predicates.at("document.type", "post")],
    {
      orderings: "[document.last_publication_date_desc]",
      fetch: ["post.titulo", "post.descricao", "post.capa"],
      pageSize: 3,
    }
  );

  const posts = res.results.map((post) => {
    return {
      slug: post.uid,
      titulo: RichText.asText(post.data.titulo),
      descricao:
        post.data.descricao.find((conteudo) => conteudo.type === "paragraph")
          ?.text ?? "",
      capa: post.data.capa.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
      page: res.page,
      totalPages: res.total_pages,
    },
    revalidate: 60 * 30,
  };
};
