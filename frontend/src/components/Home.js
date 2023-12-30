import React from 'react';
import './Home.css';

const Home = () =>{
    return(
        <div className='main'>
            <div className='left'>
                <button className='button1 button12'><a href='/createquiz'>Create Quiz</a></button>
                <button className='button1 button22'><a href='/findelection'>Participate in Quiz</a></button>
            </div>
            <div className='right'>

            </div>
        </div>
    );
}



export default Home;