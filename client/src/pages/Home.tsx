import axios from "@/api/axios";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { PostProps } from "@/types/auth.types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState<PostProps[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`/posts${category}`);
      setPosts(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [category]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Review Nguyễn Hồng Phương môn THCSDL",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://storage.googleapis.com/hust-files/5798402881224704/avatars/images/5798402881224704",
  //   },
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
  //     img: "https://storage.googleapis.com/hust-files/4547005707714560/avatars/images/4547005707714560",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://emoji.discadia.com/emojis/e880ba4e-68f8-4390-a44f-7e5b8669b0af.gif",
  //   },
  // ];
  return (
    <div className="">
      {isLoading && <Loading />}
      <div className="flex flex-col py-12 gap-36 bg-foreground-hust border-border-hust border-2 rounded-lg">
        {posts?.length ? (
          posts?.map((post: PostProps) => (
            <div
              key={post.id}
              className="flex justify-around gap-10 mx-24 odd:flex-row-reverse"
            >
              <div className="min-w-72 w-72 h-72 overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={post.img}
                  alt="post img"
                  className="min-w-full min-h-full object-cover"
                />
              </div>
              <div className="flex-2">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-bold hyphen-auto text-copy">
                    {post.title}
                  </h1>
                  <p className="line-clamp-6 indent-4 text-justify text-copy-light">
                    {post.description}
                  </p>
                </div>
                <Link to={`/post/${post.id}`}>
                  <Button className="mt-10">Read more</Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-copy-lighter italic text-lg">
            There's no post yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
