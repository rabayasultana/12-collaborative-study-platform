import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTutor, isPending: isTutorLoading } = useQuery({
        queryKey: [user?.email, "isTutor"],
    enabled: !loading,
    queryFn: async () => {
        //   console.log("asking or checking is tutor", user);
      const res = await axiosSecure.get(`/users/tutor/${user.email}`);
    //   console.log(res.data);
      return res.data?.tutor;
    },
  });
  return [isTutor, isTutorLoading];
};

export default useTutor;