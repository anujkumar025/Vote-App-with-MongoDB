import React, {useContext} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import librarySVG from './../images/library.svg';


const Home = () =>{
    const navigate = useNavigate();

    const handleCreateQuizButton = () =>{
        navigate('/createquiz');
    }
    const handleParticipateButton = () =>{
        navigate('/findelection');
    }

    return(
        <div className='design-container'>
            <div className='main'>
                <div className='Home-main-bottom'>
                    <div className='Text-box'>
                        <div className='inner-text-box'>
                        <div>Knowledge at Its</div>
                        <div>Brightest</div>
                        </div>
                    </div>
                    <div className='graphic-box'>
                        <img src={librarySVG} alt="Icon" />
                    </div>
                </div>
            </div>
            <div className='options'>
                <div className='left'>
                    <button className='button1 button12' onClick={handleCreateQuizButton}>Create Quiz</button>
                    <button className='button1 button22' onClick={handleParticipateButton}>Participate in Quiz</button>
                </div>
            </div>
            <div className='design-div'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,160C672,128,768,64,864,69.3C960,75,1056,149,1152,154.7C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>

        </div>
    );
}



export default Home;