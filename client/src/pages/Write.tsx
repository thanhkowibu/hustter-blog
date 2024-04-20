import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // import the styles
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "@/api/axios";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";

const Write = () => {
  const state = useLocation().state;

  const [val, setVal] = useState(state ? state.description : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(state ? state.category : "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const categoryArray = [
    "Study",
    "Career",
    "Research",
    "Lifestyle",
    "Technology",
    "Entertainment",
    "Other",
  ];

  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");

  const upload = async () => {
    const defaultImg =
      "https://res.cloudinary.com/dx3jpfyvb/image/upload/v1710927237/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz_xpq8zm.jpg";
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      }
      if (state?.posts_img) return state.posts_img;
      return defaultImg;
    } catch (err) {
      console.log(err);
    }
  };
  const handleDraft = async () => {
    setIsLoading(true);
    const imgUrl = await upload();
    console.log(imgUrl);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const imgUrl = await upload();
    try {
      const res = state
        ? await axios.put(
            `/posts/${state.post_id}`,
            {
              title: title,
              description: val,
              category: category,
              img: imgUrl,
              date: formattedDate,
            },
            { withCredentials: true }
          )
        : await axios.post(
            "/posts",
            {
              title: title,
              description: val,
              category: category,
              img: imgUrl,
              date: formattedDate,
            },
            { withCredentials: true }
          );
      console.log(res.data);
      navigate(state ? `/post/${state.post_id}` : "/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex gap-5 pb-7">
        <div className="flex-5 flex flex-col gap-5 py-3 px-5 border-border-hust rounded-lg border-2">
          <h1 className="text-xl text-primary-dark font-bold">Post editor</h1>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-3 bg-foreground-hust border-border-hust border-2 text-lg  text-copy-lighter"
          />
          <TextArea
            val={val}
            setVal={setVal}
            isLearning={false}
            placeholder="Content"
          />
        </div>
        <div className="flex-2 flex flex-col gap-5">
          <div className="flex-1 flex flex-col justify-between gap-2 p-3 border-border-hust rounded-lg border-2 text-sm text-copy-light">
            <h1 className="text-xl text-primary-dark font-bold">Publish</h1>
            <span>
              <b>Status:</b> <b>Draft</b>
            </span>
            <span>
              <b>Visibility:</b> <b>Public</b>
            </span>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="underline flex gap-1 w-min">
              <span className="cursor-pointer text-nowrap overflow-hidden max-w-32 text-ellipsis">
                {file ? file.name : "Upload image"}
              </span>
              <span className="flex items-end size-5 cursor-pointer">
                <MdOutlineDriveFolderUpload className="size-full" />
              </span>
            </label>
            <div className="flex justify-between">
              <Button variant="hustsecondary" onClick={handleDraft}>
                Save as draft
              </Button>
              <Button variant="hust" onClick={handleSubmit}>
                {state ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-2 px-3 py-2 border-border-hust rounded-lg border-2 text-sm text-copy-light">
            <h1 className="text-xl text-primary-dark font-bold">Category</h1>
            {categoryArray.map((name, index) => (
              <div
                className="flex text-primary-dark items-center gap-2"
                key={index}
              >
                <input
                  type="radio"
                  name="category"
                  value={name}
                  id={name}
                  defaultChecked={name === category}
                  onClick={(e: any) => setCategory(e.target.value)}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
