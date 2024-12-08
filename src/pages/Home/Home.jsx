import Banner from "../../components/Banner/Banner";
import StudySession from "../../components/StudySession/StudySession";
import TutorList from "../../components/TutorList/TutorList";

const Home = () => {
    return (
        <div className="my-8">
           <Banner></Banner>
           <StudySession></StudySession>
           <TutorList></TutorList>
        </div>
    );
};

export default Home;