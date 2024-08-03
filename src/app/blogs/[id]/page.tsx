import { onGetBlogPost, onGetBlogPosts } from "@/actions/landing";
import { CardDescription } from "@/components/ui/card";
import { getMonthName } from "@/lib/utils";
import React from "react";
import parse from "html-react-parser";

type Props = { params: { id: string } };

const PostPage = async ({ params }: Props) => {
  const post = await onGetBlogPost(params.id);
  return (
    <div className="container flex justify-center my-10">
      <div className="xl:w-6/12 flex flex-col p-12">
        <CardDescription>
          {getMonthName(post?.createdAt.getMonth()!)}{" "}
          {post?.createdAt.getDate()} {","} {post?.createdAt.getFullYear()}{" "}
        </CardDescription>
        <h2 className="text-6xl font-bold my-8">{post?.title}</h2>
        <div className="parsed-container">{parse(post?.content)}</div>
      </div>
    </div>
  );
};

export default PostPage;
