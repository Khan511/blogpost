import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/callToAction/CallToAction";
// 08:07:40
const SinglePost = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" className="text-4xl" />
      </div>
    );

  console.log(post);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col  p-3">
      <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-6 flex justify-center self-center"
      >
        <Button color="gray" size="xs" pill>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-3 max-h-[600px] w-full object-cover p-3"
      />
      <div className="mx-auto flex w-full max-w-2xl justify-between border-b border-slate-500 px-3 pb-3 text-xs">
        <span className="">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(2)} mins read
        </span>
      </div>
      <div
        className="post-content mx-auto w-full max-w-2xl p-3"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="mx-auto w-full max-w-4xl">
        <CallToAction />
      </div>
    </main>
  );
};

export default SinglePost;
