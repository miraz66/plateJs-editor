import { fetchData } from "@/lib/api_2";
interface Params {
  params: {
    id: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function PostDetail({ params }: Params) {
  const { id } = await params;
  const post = await fetchData<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  return (
    <div className="font-raleway mx-auto flex h-screen max-w-screen-md flex-col items-center justify-center px-4">
      <div className="rounded-xl border border-gray-800 p-10 shadow-lg shadow-gray-800">
        <h1 className="py-5 text-center text-3xl font-bold text-gray-400">
          Post Detail
        </h1>
        <div className="space-y-2">
          <p className="text-gray-400">User ID: {post.userId}</p>
          <p className="text-gray-400">Post ID: {post.id}</p>
          <p className="text-xl text-gray-400">Title: {post.title}</p>
          <p className="text-gray-400">Description: {post.body}</p>
        </div>
      </div>
    </div>
  );
}
