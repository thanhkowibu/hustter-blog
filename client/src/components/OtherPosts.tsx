import { PostProps } from "@/types/auth.types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

const OtherPosts = ({
  post_id,
  category,
}: {
  post_id: string;
  category: string;
}) => {
  const [posts, setPosts] = useState([] as PostProps[]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `/posts/${post_id}/related?category=${category}`
      );
      // console.log(res.data);
      setPosts(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [post_id, category]);

  // const posts = [
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
  return (
    <div className="w-1/4 flex flex-col space-y-5">
      <h1 className="text-xl text-primary-dark font-semibold">
        Other posts you may like
      </h1>
      {!isLoading &&
        posts &&
        posts?.map((post: PostProps) => (
          <div className="flex-2 flex flex-col gap-3" key={post.id}>
            <img
              className="w-full h-56 object-cover rounded-xl shadow-xl"
              src={post.img}
              alt=""
            />
            <h2 className="text-2xl font-bold hyphen-auto text-primary-dark">
              {post.title}
            </h2>
            <Button
              variant="hustsecondary"
              className="w-28"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              Read more
            </Button>
          </div>
        ))}
    </div>
  );
};

export default OtherPosts;
