import axios from "axios";
import { Post } from "components/Post/props";
import PostCard from "components/PostCard";
import { User } from "components/User/props";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Props = {
  user: User;
  posts: Post[];
};

const UserId: React.FC<Props> = ({ user, posts }) => {
  if (!user) return <div></div>;

  const { email, firstName, lastName, picture } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <header className="grid grid-cols-3 gap-x-2 pt-8 px-8">
        <img
          className="w-24 h-24 rounded-lg"
          src={picture}
          alt={`${fullName} Image`}
        />
        <div className="flex flex-col col-span-2 pt-4">
          <h1 className="font-medium text-base truncate">{fullName}</h1>
          <h2 className="text-sm leading-1 opacity-70 truncate">{email}</h2>
        </div>
      </header>
      {posts.length && (
        <ul className="px-8 py-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserId;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await axios
    .get(`${process.env.API_BASE_URL}/user`, {
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
  const user: User = await axios
    .get(`${process.env.API_BASE_URL}/user/${params.id}`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) => data)
    .catch(console.error);

  const posts: Post[] = await axios
    .get(`${process.env.API_BASE_URL}/user/${params.id}/post`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) => data.data)
    .catch(console.error);

  return {
    props: {
      user,
      posts,
    },
    revalidate: 1,
  };
};
