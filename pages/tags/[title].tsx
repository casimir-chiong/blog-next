import axios from "axios";
import { Post } from "components/Post/props";
import PostCard from "components/PostCard";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Props = {
  posts: Post[];
};

const UserId: React.FC<Props> = ({ posts }) => {
  if (!posts) return <div></div>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard {...post} />
      ))}
    </div>
  );
};

export default UserId;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await axios
    .get(`${process.env.API_BASE_URL}/tag`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) =>
      data.data.map((data) => ({
        params: { title: data.title },
      }))
    )
    .catch(console.error);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts: Post[] = await axios
    .get(`${process.env.API_BASE_URL}/tags/${params.title}/post`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) => data.data)
    .catch(console.error);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};
