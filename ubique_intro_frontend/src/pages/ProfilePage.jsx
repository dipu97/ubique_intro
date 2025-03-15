import { getUserInfo } from "@/services/apiCard";
import BlogContainer from "@/component/BlogContainer";
import Hero from "@/component/Hero";
import Spinner from "@/component/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const {username} = useParams()

  const { isPending, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username)
  })
console.log(data)
  const cards = data?.author_posts

  if(isPending){
    return <Spinner />
  }

  return (
    <>
      <Hero userInfo={data} />
      <BlogContainer cards={cards} title={`${username}'s Posts`} />
    </>
  );
};

export default ProfilePage;