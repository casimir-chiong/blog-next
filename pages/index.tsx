import { GetStaticProps } from "next";
import Head from "next/head";
import axios from "axios";
import { PostProps } from "components/Post/props";
import Divider from "components/Divider";
import PostCard from "components/PostCard";

type Props = {
  posts: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      <Head>
        <title>Blog with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-8 pt-8 pb-6">
        <h1 className="text-2xl font-bold">Blog</h1>
      </header>

      <Divider />

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
  const posts = await axios
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
