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
        client,
        handleConnect,
        handlePublish,
      } = useBrokerMQTT();

    useEffect(() => {
        handleConnect();
    }, []);


    // function handleConnect() {
    //     const url = "ws://tanagra.lowell.edu:61614/mqtt";
    //     console.log(url);
    //     const options = {
    //         keepalive: 30,
    //         protocolId: "MQTT",
    //         protocolVersion: 4,
    //         clean: true,
    //         reconnectPeriod: 1000,
    //         connectTimeout: 30 * 1000,
    //         will: {
    //             topic: "WillMsg",
    //             payload: "Connection Closed abnormally..!",
    //             qos: 0,
    //             retain: false,
    //         },
    //         clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    //         username: "username",
    //         password: "password",
    //         rejectUnauthorized: false
    //     };

    //     doConnect(url, options);
    // }

    // function doConnect(host, mqttOptions) {
    //     console.log(host);
    //     setClient(mqtt.connect(host, mqttOptions));
    //     console.log(client);
    //     if (client) {
    //         console.log(client);
    //     }

    //     if (client) {
    //         client.on("connect", () => {
    //             console.log("Connected");
    //             console.log(client);
    //         });
    //         client.on("error", (err) => {
    //             console.error("Connection error: ", err);
    //             client.end();
    //         });
    //         client.on("message", (topic, message) => {
    //             const payload = { topic, message: message.toString() };
    //             const changed = message.toString();

    //             var parser = new DOMParser();
    //             var doc = parser.parseFromString(changed, 'text/xml');
    //             console.log((new XMLSerializer()).serializeToString(doc));

    //         });

    //     }
    // };

    // function handlePublish(topic, qos, payload) {
    //     if (client) {
    //         client.publish(topic, payload, { qos }, (error) => {
    //             if (error) {
    //                 console.log("Publish error: ", error);
    //             }
    //         });
    //     }
    // };

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