// import { fetchData } from "@/lib/api";
import { fetchData } from "@/lib/api_2";
import Post from "@/components/post";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function Home() {
  const posts = await fetchData<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <h1 className="py-5 text-3xl font-bold text-gray-400">
        Fetch data from api
      </h1>
      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-500">
        {posts.map((data) => (
          <Post key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
}
