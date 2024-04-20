import PostArea from "@/components/PostArea";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import OtherPosts from "@/components/OtherPosts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { Loading } from "@/components/Loading";
import { PostProps } from "@/types/auth.types";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "@/context/authContext";

const Single = () => {
  const [post, setPost] = useState({} as PostProps);
  const [isLoading, setIsLoading] = useState(true);

  const postId = useLocation().pathname.split("/")[2];

  const navigate = useNavigate();

  const { user, scrollToTop } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/posts/${postId}`);
      setPost(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [postId]);
  let timeAgo;
  if (post.date) {
    const date = new Date(post.date);
    timeAgo = formatDistanceToNow(date, { addSuffix: true });
  }

  const handleDelete = async () => {
    // console.log("Delete post");
    try {
      setIsLoading(true);
      const res = await axios.delete(`/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  scrollToTop();

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-between gap-12">
        <div className="w-2/3 flex flex-col gap-7">
          <img
            src={post.posts_img}
            alt="post image"
            className="w-full h-80 object-cover"
          />
          <div className="flex items-center gap-3 text-sm">
            <img
              src={post.users_img}
              alt="user image"
              className="size-12 rounded-full object-cover"
            />
            <div>
              <span className="font-semibold">{post.username}</span>
              <p>Posted {timeAgo}</p>
            </div>
            {user?.id === post.uid && (
              <div className="flex gap-2">
                <Link to={`/write?id=${postId}`} state={post}>
                  <CiEdit className="size-5 cursor-pointer" />
                </Link>
                <CiTrash
                  className="size-5 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold hyphen-auto text-primary-light">
            {post.title}
          </h1>
          {/* <p className="text-justify text-copy-light whitespace-pre-line">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus
                excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem
                ratione sit debitis deserunt repellendus numquam ab vel perspiciatis
                corporis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea
                dolorem ratione sit debitis deserunt repellendus numquam ab vel
                perspiciatis corporis!
      
                  Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam
                facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus
                numquam ab vel perspiciatis corporis! Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. A possimus excepturi aliquid nihil
                cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis
                deserunt repellendus numquam ab vel perspiciatis corporis! Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. A possimus
                excepturi aliquid nihil cumque ipsam facere aperiam at!
      
                  Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel
                perspiciatis corporis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea
                dolorem ratione sit debitis deserunt repellendus numquam ab vel
                perspiciatis corporis!
              </p> */}
          <PostArea val={post.description} />
        </div>
        <OtherPosts post_id={postId} category={post.category} />
      </div>
    </>
  );
};

export default Single;
