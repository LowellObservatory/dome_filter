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
import filterData from "./filters.json";

// const [filterData, setFilterData] = React.useState(filterData);

function FilterForm() {
    // const [filterData, setFilterData] = React.useState({ filterData });

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
                    {/* <Row> */}
                    <ButtonGroup vertical>
                        {filterData && filterData.map(({ SLOT, FILTER }) => (
                            <Button variant="outline-primary" size="sm">{FILTER}</Button>
                        ))}
                    </ButtonGroup>
                    {/* </Row> */}
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
                    <Badge bg="success" size="sm">Connect Error</Badge>
                    <Badge bg="success" size="sm">Wheel Error</Badge>
                </Col>
            </Row>
        </Form >
    )
}

export default FilterForm;