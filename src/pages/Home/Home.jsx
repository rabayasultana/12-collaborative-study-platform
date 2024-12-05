import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import StudySession from "../../components/StudySession/StudySession";

const Home = () => {
    return (
        <div className="my-8">
           <Banner></Banner>
           <StudySession></StudySession>
        </div>
    );
};

export default Home;