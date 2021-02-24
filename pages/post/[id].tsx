import axios from "axios";
import { Post } from "components/Post/props";
import PostCard from "components/PostCard";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

const UserId: React.FC<Post> = (props) => {
  if (!props) return <div></div>;

  return (
    <div className="p-8">
      <PostCard {...props} />
    </div>
  );
};

export default UserId;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await axios
    .get(`${process.env.API_BASE_URL}/post`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) =>
      data.data.map((data) => ({
        params: { id: data.id },
      }))
    )
    .catch(console.error);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: Post = await axios
    .get(`${process.env.API_BASE_URL}/post/${params.id}`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) => data)
    .catch(console.error);

  return {
    props: {
      ...post,
    },
    revalidate: 1,
  };
};
