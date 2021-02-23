import Link from "next/link";
import Divider from "components/Divider";
import { PostProps } from "components/Post/props";
import React from "react";
import moment from "moment";
import { Tag } from "./components";

const PostCard: React.FC<PostProps> = (props) => {
  const { owner, image, text, tags, likes, publishDate, id: postId } = props;
  const { firstName, lastName, picture, id: userId } = owner;
  const fullName = `${firstName} ${lastName}`;

  return (
    <li className="w-72 mb-6 bg-gray-50">
      <header className="p-4">
        <Link href={`/profile/${userId}`}>
          <a className="flex items-center">
            <img
              className="mr-2 w-12 h-12 object-contain rounded-full"
              src={picture}
              alt={`${fullName} Image`}
            />
            <span className="leading-none">
              <h3 className="mb-1 font-medium">{fullName}</h3>
              <p className="flex items-center opacity-70">
                {moment(publishDate).format("D MMM YY")}
                <span className="flex w-1 h-1 bg-black rounded mx-2 opacity-70" />
                {moment(publishDate).format("HH:mm")}
              </p>
            </span>
          </a>
        </Link>
      </header>
      <Link href={`/posts/${postId}`}>
        <a>
          <img className="w-full" src={image} alt={`${text} Image`} />
          <article className="p-4">
            <h4 className="leading-4 mb-4">{text}</h4>
            <div>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </article>
        </a>
      </Link>
      <Divider />
      <div className="p-4 flex items-center">
        <img src="/like.svg" alt="Like Icon" />
        <p className="ml-2">{likes} likes</p>
      </div>
    </li>
  );
};

export default PostCard;
