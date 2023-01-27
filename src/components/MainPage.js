import React from 'react';
import ICNavbar from "./ICNavbar";
// import PeopleForm from "./PeopleForm";
// import InstForm from "./InstForm";
// import WeatherForm from "./WeatherForm";
// import TimeForm from "./TimeForm";
// import StatusForm from "./StatusForm";
// import hand from "../assets/images/Daco_224512.png";
import {
    Container,
    Row,
    Button,
    ButtonGroup,
    Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';

function MainPage() {
    return (

        // <Container fluid className="mainpage-container">
        <Container style={{ width: "98%", height: "100%" }}>
            <ICNavbar />
        </Container >
    )
}

export default MainPage;