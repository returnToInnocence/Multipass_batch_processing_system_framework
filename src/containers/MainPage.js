import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Details from '../components/details/Details';
import React from 'react';

function MainPage(){
    return(
        <div className="container ui grid">
            <Header />
            <Sidebar />
            <Details />
        </div >
    )
}

export default MainPage