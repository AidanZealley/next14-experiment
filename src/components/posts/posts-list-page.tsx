import { RouterOutputs } from "@/trpc/shared";
import { PostsListItem } from "./posts-list-item";

type PostsListPageProps = {
  postsPage: RouterOutputs["post"]["infinite"]["postsPage"];
};

export const PostsListPage = ({ postsPage }: PostsListPageProps) => {
  return (
    <div className="grid gap-10">
      {postsPage.map((data) => (
        <PostsListItem data={data} key={data.post.id} />
      ))}
    </div>
  );
};
