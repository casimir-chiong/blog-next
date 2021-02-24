import { User } from "components/User/props";

export type Post = {
  id: string;
  image: string;
  likes: 43;
  link: string;
  owner: User;
  publishDate: string;
  tags: string[];
  text: string;
};
