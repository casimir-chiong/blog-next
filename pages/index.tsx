import { GetStaticProps } from "next";
import Head from "next/head";
import axios from "axios";
import { Post } from "components/Post/props";
import PostCard from "components/PostCard";

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Blog with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await axios
    .get(`${process.env.API_BASE_URL}/post`, {
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

export default Home;
