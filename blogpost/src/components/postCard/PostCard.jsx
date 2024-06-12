import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-lg border border-teal-200 hover:border-2 sm:w-80">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post Image"
          className="z-20 h-[260px] w-full object-cover transition-all duration-300 group-hover:h-[200px]  "
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-semibold">
          {" "}
          {post.title.length > 50
            ? post.title.slice(0, 80) + "..."
            : post.title}
        </p>
        <span className="text-sm italic">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="absolute bottom-[-200px]  left-0 right-0 rounded-lg !rounded-tl-none  border-2 border-teal-500 px-2 py-1 transition-all duration-300 group-hover:bottom-0 hover:bg-teal-500 hover:text-white"
        >
          <p className="font-semibold">read article...</p>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
