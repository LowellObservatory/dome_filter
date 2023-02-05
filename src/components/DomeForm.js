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
        message,
        handleConnect,
        handlePublish,
        handleSubscribe,
        handleUnsub,
        handleDisconnect
    } = useBrokerMQTT();

    useEffect(() => {
        handleConnect();
        setTimeout(function () {
            handleSubscribe("lorax/j1m/dome/broadcast", 0);
        }, 1000);
    }, []);

    useEffect(() => {
        if(message) {
        console.log("the message");
        // console.log(message);
        outtext = "";
        var timeut, outtext;
        timeut = message.getElementsByTagName("timestamput");
        var connected = message.getElementsByTagName("connected");
        var azimuth = message.getElementsByTagName("azimuth");
        var shutter_open = message.getElementsByTagName("shutter_open");
        var track_mount = message.getElementsByTagName("track_mount");
        
        outtext = "timestamput: " + timeut[0].childNodes[0].nodeValue;
        outtext = outtext + "\nconnected: " + connected[0].childNodes[0].nodeValue;
        outtext = outtext + "\nazimuth: " + azimuth[0].childNodes[0].nodeValue;
        outtext = outtext + "\nshutter_open: " + shutter_open[0].childNodes[0].nodeValue;
        outtext = outtext + "\ntrack_mount: " + track_mount[0].childNodes[0].nodeValue;
        console.log(outtext);
        }
    });



    function toggleConnected(e) {
        if (Connected) {
            setConnected(false);
            handleUnsub("lorax/j1m/dome/broadcast", 0);
            handlePublish("testDome", 0, "<value>disconnected</value>");
            handlePublish("lorax/j1m/command/dome", 0, "disconnect");
            document.getElementById("connection").innerHTML = "State: Disconnected";

        } else {
            setConnected(true);
            handleSubscribe("lorax/j1m/dome/broadcast", 0);
            handlePublish("testDome", 0, "<value>connected</value>");
            handlePublish("lorax/j1m/command/dome", 0, "init");
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