import React, { useState, useEffect } from 'react';
import {
    Form,
    Row,
    Col,
    Button,
    Badge
} from 'react-bootstrap';
import mqtt from "mqtt";
import 'bootstrap/dist/css/bootstrap.min.css';
import './DomeForm.css';
import useBrokerMQTT from "./useBrokerMQTT";


function DomeForm() {

    const [Connected, setConnected] = useState(false);
    const {
        message,
        handleConnect,
        handlePublish,
      } = useBrokerMQTT();

    useEffect(() => {
        handleConnect();
    }, []);

    useEffect(() => {
        // Use "message" to update status fields.
    });


    
    function toggleConnected(e) {
        if (Connected) {
            setConnected(false);
            handlePublish("testDome", 0, "<value>disconnected</value>");
            document.getElementById("connection").innerHTML = "State: Disconnected";

        } else {
            setConnected(true);
            handlePublish("testDome", 0, "<value>connected</value>");
            document.getElementById("connection").innerHTML = "State: Connected";
        }
        console.log(Connected);
    }

    return (

        <Form className="domeform">
            <Form.Text className="domeform_text"> Dome Control </Form.Text>
            <p />
            <p />
            <Row className="align-items-top">
                <Col className="buttoncolumn" lg={{ span: 2, offset: 1 }}>
                    <Row>
                        <Button onClick={toggleConnected} size="sm">Connect/Disconnect</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Home</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Open</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Close</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Follow</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button size="sm">Unfollow</Button>
                    </Row>
                    <p />
                    <p />
                    <Badge bg="success" size="sm">Connect Error</Badge>
                    <Badge bg="success" size="sm">Read Error</Badge>
                    <Badge bg="success" size="sm">Shutter Error</Badge>

                </Col>
                <Col style={{ border: 2 }} className="buttoncolumn2" lg={{ span: 2, offset: 2 }}>
                    <Row className="statlab">
                        <div className="connection" id="connection">
                            State: Disconnected
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="home">
                            Home: Unknown
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="shutter">
                            Shutter: closed
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="rotation">
                            Rotation: settled
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="azimuth">
                            Azimuth: 127
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="follow">
                            Following: false
                        </div>
                    </Row>
                </Col>
            </Row>
        </Form>

    )
}

export default DomeForm;