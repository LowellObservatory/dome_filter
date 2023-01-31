import React from 'react';
import ICNavbar from "./ICNavbar";
// import PeopleForm from "./PeopleForm";
// import InstForm from "./InstForm";
// import WeatherForm from "./WeatherForm";
// import TimeForm from "./TimeForm";
import DomeForm from "./DomeForm";
import FilterForm from "./FilterForm";
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
        <Container className="mainPage">
            <ICNavbar />
            <p />
            <p />
            <Row style={{ marginLeft: 0, marginRight: 0 }} >
                <Col style={{ paddingLeft: 10, paddingRight: 20 }}>
                    <DomeForm />
                </Col>
                <Col style={{ paddingLeft: 10, paddingRight: 20 }}>
                    <FilterForm />
                </Col>
            </Row>
        </Container >
    )
}

export default MainPage;