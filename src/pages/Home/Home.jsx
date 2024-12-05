import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import StudySession from "../../components/StudySession/StudySession";

const Home = () => {
    const studySessions = useLoaderData();
    return (
        <div className="my-8">
           <Banner></Banner>
           <StudySession studySessions={studySessions}></StudySession>
        </div>
    );
};

export default Home;