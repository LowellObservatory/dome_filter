import React from 'react';
import {
    Form,
    Row,
    Col,
    Badge,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilterForm.css';
import filter1Data from "./filters1.json";
import filter2Data from "./filters2.json";

function FilterForm() {

    return (

        <Form className="filterform">
            <Form.Text className="filterform_text"> Filter Wheel Control </Form.Text>
            <p />
            <p />
            <Row className="align-items-top">
                <Col className="buttoncolumn" lg={{ span: 2, offset: 1 }}>
                    <Row>
                        <Button size="sm">Connect/Disconnect</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Home</Button>
                    </Row>
                    <p />
                    <Row>
                        <Col>
                            <ButtonGroup vertical>
                                {filter1Data && filter1Data.map(({ SLOT, FILTER }) => (
                                    <Button variant="outline-primary" size="sm">{FILTER}</Button>
                                ))}
                            </ButtonGroup>
                        </Col>
                        <Col>
                            <ButtonGroup vertical>
                                {filter2Data && filter2Data.map(({ SLOT, FILTER }) => (
                                    <Button variant="outline-primary" size="sm">{FILTER}</Button>
                                ))}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ border: 2 }} className="buttoncolumn2" lg={{ span: 2, offset: 2 }}>

                    <Row className="statlab">
                        <div className="connection">
                            State: Disconnected
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="home">
                            Home: unknown
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="filter">
                            Current Filter: Home/Clr
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="moving">
                            Moving: False
                        </div>
                    </Row>
                    <p />
                    <Row >
                        <Badge bg="success" size="sm">Connect Error</Badge>
                    </Row>
                    <Row className="warnflag">
                        <Badge bg="success" size="sm">Wheel Error</Badge>
                    </Row>
                </Col>
            </Row>
        </Form >
    )
}

export default FilterForm;