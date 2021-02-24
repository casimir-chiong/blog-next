import axios from "axios";
import Tag from "components/Tag";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <div>
      <ul className="p-8">
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`} passHref>
            <Tag text={tag} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Tags;

export const getStaticProps: GetStaticProps = async () => {
  const tags: string[] = await axios
    .get(`${process.env.API_BASE_URL}/tag?limit=100`, {
      headers: { "app-id": process.env.API_APP_ID },
    })
    .then(({ data }) => data.data)
    .catch(console.error);

  return {
    props: {
      tags,
    },
    revalidate: 1,
  };
};
