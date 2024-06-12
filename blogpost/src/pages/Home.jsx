import { Link } from "react-router-dom";
import CallToAction from "../components/callToAction/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/postCard/PostCard";

const Home = () => {
  const [posts, setSposts] = useState([]);

  const getPosts = async (signal) => {
    try {
      const res = await fetch("/api/post/getposts?limit=9");

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
      }

      if (res.ok) {
        const data = await res.json();

        setSposts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    getPosts(signal);

    return () => controler.abort();
  }, []);

  console.log(posts);
  return (
    <div className="min-h-screen">
      <div className=" m-auto  flex max-w-7xl flex-col justify-center p-28 px-3">
        <h1 className="mb-8 text-4xl font-semibold md:text-6xl">
          Welcome to my Blog
        </h1>
        <p>
          Here you 'll find a variety of articles and tutorials on topics such
          as web development, software engineering and programming languages.
        </p>

        <Link
          className="mt-4 font-semibold text-blue-500"
          to="/dashboard?tab=posts"
        >
          View all posts
        </Link>
      </div>
      <div className="bg-yellow-100 p-2 dark:bg-slate-700 sm:p-4">
        <div className="">
          <CallToAction />
        </div>
      </div>
      <div className=" mx-auto my-12 flex max-w-6xl flex-wrap justify-center gap-6">
        {posts &&
          posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
      </div>
      <div className="my-4 flex justify-center text-blue-500 underline">
        <Link to="/dashboard?tab=posts"> View all posts </Link>
      </div>
    </div>
  );
};

export default Home;
