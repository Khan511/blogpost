import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/postCard/PostCard";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [sideBareData, setSideBareData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const urlsearchParam = new URLSearchParams(location.search);

    const searchParamFromUrl = urlsearchParam.get("searchTerm") || "";
    const sortFromUrl = urlsearchParam.get("sort") || "desc";
    const categoryFromUrl = urlsearchParam.get("category") || "uncategorized";

    if (urlsearchParam || sortFromUrl || categoryFromUrl) {
      setSideBareData((prevData) => ({
        ...prevData,
        searchTerm: searchParamFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlsearchParam.toString();

      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`, {
          signal,
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.posts.length < 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          // Ensure the error isn't logged unless it's not an AbortError
          console.error("Fetch error:", error);
          setLoading(false);
        }
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setSideBareData((prevdata) => ({
      ...prevdata,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParam = new URLSearchParams(location.search);

    urlParam.set("searchTerm", sideBareData.searchTerm);
    urlParam.set("sort", sideBareData.sort);
    urlParam.set("category", sideBareData.category);

    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;

    const urlsearchParam = new URLSearchParams(location.search);

    urlsearchParam.set("startIndex", startIndex);
    const searchQuery = urlsearchParam.toString();

    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }

      setShowMore(false);

      setLoading(false);
    } catch (error) {
      if (error.name !== "AbortError") {
        // Ensure the error isn't logged unless it's not an AbortError
        console.error("Fetch error:", error);
        setLoading(false);
      }
      setLoading(false);
    }
  };
  console.log(posts.length);

  return (
    <div className="flex min-h-screen flex-col md:flex-row   ">
      <div className="flex p-2 md:border-r-4  md:p-6">
        <form onSubmit={handleSubmit}>
          <div className=" mb-4 mt-10 flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sideBareData.searchTerm || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center gap-16">
            <label className="font-semibold">Sort:</label>
            <Select
              onChange={handleChange}
              value={sideBareData.sort || "desc"}
              id="sort"
            >
              <option value={"desc"}>Latest</option>
              <option value={"asc"}>Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-7">
            <label className="font-semibold">Category:</label>
            <Select
              id="category"
              onChange={handleChange}
              value={sideBareData.category || "uncategorized"}
            >
              <option value={"uncategorized"}>Uncategorized</option>
              <option value={"nextjs"}>Next.js</option>
              <option value={"reactjs"}>React.js</option>
              <option value={"javascript"}>JavaScript</option>
            </Select>
          </div>

          <div className="mt-5">
            <Button type="submit" outline>
              Apply Filters
            </Button>
          </div>
        </form>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="ml-2 w-full border-b py-4 text-3xl font-semibold ">
          Search results:
        </h1>
        <div className="flex max-w-screen-2xl	flex-wrap justify-center gap-2 p-3 md:mt-10">
          {!loading && posts.length === 0 && (
            <p className="mt-5 text-center text-3xl">No posts available</p>
          )}
          {loading && <p className="text-center text-3xl">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </div>
        <div className=" my-4 flex w-full justify-center">
          {showMore && (
            <Button outline onClick={handleShowMore}>
              Show More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
