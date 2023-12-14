import { PostData, PostListItem } from "./post-list-item";

export type PostDataPage = PostData[]

type PostsListPageProps = {
  postsPage: PostDataPage
}

export const PostsListPage = ({ postsPage }: PostsListPageProps) => {
  return (
    <div className="grid gap-10">
      {postsPage.map((data) => (
        <PostListItem data={data} key={data.post.id} />
      ))}
    </div>
  );
};
