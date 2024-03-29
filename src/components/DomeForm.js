import React, { useState, useEffect } from 'react';
import {
    Form,
    Row,
    Col,
    Button,
    InputGroup,
    // FormControl,
    Badge
} from 'react-bootstrap';
// import mqtt from "mqtt";
import 'bootstrap/dist/css/bootstrap.min.css';
import './DomeForm.css';
import useBrokerMQTT from "./useBrokerMQTT";
import configData from "../config.json";


function DomeForm() {

    const [azVal, setAzVal] = useState(0);
    const [nudgeVal, setNudgeVal] = useState(0);
    const [Connected, setConnected] = useState(false);
    const {
        client,
        message,
        handleConnect,
        handlePublish,
        handleSubscribe,
        // handleUnsub,
        // handleDisconnect
    } = useBrokerMQTT();

    useEffect(() => {
        handleConnect();
    }, []);

    useEffect(() => {
        handleSubscribe("lorax/j1m/dome/broadcast", 0);
    }, [client]);

    useEffect(() => {
        if (message) {
            // console.log("the message");
            // console.log(message);
            // var outtext = "";
            // var timeut;
            // timeut = message.getElementsByTagName("timestamput");
            var connected = message.getElementsByTagName("connected");
            var azimuth = message.getElementsByTagName("azimuth");
            var shutter_open = message.getElementsByTagName("shutter_open");
            var is_home = message.getElementsByTagName("is_home");
            var track_mount = message.getElementsByTagName("track_mount");
            var dome_busy = message.getElementsByTagName("dome_busy");
            // console.log(connected[0].childNodes[0].nodeValue)

            if (connected[0].childNodes[0].nodeValue === "True") {
                // console.log("setting connected");
                document.getElementById("connection").innerHTML = "State: Connected";
            } else {
                // console.log("setting disconnected");
                document.getElementById("connection").innerHTML = "State: Disconnected";
            }

            if (shutter_open[0].childNodes[0].nodeValue === "True") {
                // console.log("setting open");
                document.getElementById("shutter").innerHTML = "Shutter: open";
            } else {
                // console.log("setting closed");
                document.getElementById("shutter").innerHTML = "Shutter: closed";
            }

            if (is_home[0].childNodes[0].nodeValue === "True") {
                // console.log("setting open");
                document.getElementById("home").innerHTML = "Home: True";
            } else {
                // console.log("setting closed");
                document.getElementById("home").innerHTML = "Home: False";
            }

            if (track_mount[0].childNodes[0].nodeValue === "True") {
                // console.log("setting open");
                document.getElementById("follow").innerHTML = "Following: true";
            } else {
                // console.log("setting closed");
                document.getElementById("follow").innerHTML = "Following: false";
            }

            if (dome_busy[0].childNodes[0].nodeValue === "True") {
                // console.log("setting open");
                document.getElementById("busy").innerHTML = "Dome Busy: True";
                document.getElementById("busy").style.backgroundColor = "red";
            } else {
                // console.log("setting closed");
                document.getElementById("busy").innerHTML = "Dome Busy: False";
                document.getElementById("busy").style.backgroundColor = "lightgreen";
            }

            document.getElementById("azimuth").innerHTML = "azimuth: " + azimuth[0].childNodes[0].nodeValue;
            // outtext = "timestamput: " + timeut[0].childNodes[0].nodeValue;
            // outtext = outtext + "\nconnected: " + connected[0].childNodes[0].nodeValue;
            // outtext = outtext + "\nazimuth: " + azimuth[0].childNodes[0].nodeValue;
            // outtext = outtext + "\nshutter_open: " + shutter_open[0].childNodes[0].nodeValue;
            // outtext = outtext + "\ntrack_mount: " + track_mount[0].childNodes[0].nodeValue;
            // console.log(outtext);
        }
    });

    function doHome() {
        handlePublish("lorax/j1m/dto/dome", 0, "home");
    }
    function doOpen() {
        handlePublish("lorax/j1m/dto/dome", 0, "open_shutter");
    }
    function doClose() {
        handlePublish("lorax/j1m/dto/dome", 0, "close_shutter");
    }

    function doFollow() {
        handlePublish("lorax/j1m/dto/dome", 0, "start_track_mount");
    }

    function doUnfollow() {
        handlePublish("lorax/j1m/dto/dome", 0, "stop_tracking");
    }

    function doStop() {
        handlePublish("lorax/j1m/dto/dome", 0, "stop");
    }

    function toggleConnected(e) {
        if (Connected) {
            setConnected(false);
            // handleUnsub("lorax/j1m/dome/broadcast", 0);
            // handlePublish("testDome", 0, "<value>disconnected</value>");
            handlePublish("lorax/j1m/dto/dome", 0, "disconnect");
            // document.getElementById("connection").innerHTML = "State: Disconnected";

        } else {
            setConnected(true);
            // handleSubscribe("lorax/j1m/dome/broadcast", 0);
            // handlePublish("testDome", 0, "<value>connected</value>");
            handlePublish("lorax/j1m/dto/dome", 0, "init");
            // document.getElementById("connection").innerHTML = "State: Connected";
        }
        // console.log(Connected);
    }

    function sendAz(event) {
        console.log("setaz(" + azVal + ")");
        handlePublish("lorax/j1m/dto/dome", 0, "move(" + azVal + ")");
    }

    function sendNudge(event) {
        console.log("nudge(" + nudgeVal + ")");
        handlePublish("lorax/j1m/dto/dome", 0, "nudge(" + nudgeVal + ")");
    }

    return (

        <Form className="domeform" onSubmit={sendAz}>
            <Form.Text className="domeform_text"> Dome Control </Form.Text>
            <p />
            <p />
            <Row className="align-items-top">
                <Col className="buttoncolumn" lg={{ span: 2, offset: 1 }}>
                    <Row>
                        <Button onClick={toggleConnected} className="custom-btn" size="sm">Connect/Disconnect</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button onClick={doHome} className="custom-btn" size="sm">Home</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button onClick={doOpen} className="custom-btn" size="sm">Open</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button onClick={doClose} className="custom-btn" size="sm">Close</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button onClick={doFollow} className="custom-btn" size="sm">Follow</Button>
                    </Row>
                    <p />
                    <Row>
                        <Button onClick={doUnfollow} className="custom-btn" size="sm">Unfollow</Button>
                    </Row>
                     <p />
                    <Row>
                        <Button onClick={doStop} className="custom-btn" size="sm">Stop</Button>
                    </Row>
                    <p />
                    <Row className="align-items-center">
                        {/* <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                            Enter Azimuth:
                        </Form.Label> */}
                        <InputGroup size="sm" className="mb-2">
                            <InputGroup.Text className="input-label">Az:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                // onChange={sendAz.bind(this)} 
                                size="sm"
                                id="inlineFormInputGroup"
                                value={azVal}
                                onChange={(event) => { setAzVal(event.target.value) }}
                                placeholder="0000" />
                            <Button
                                className="btnFormSend"
                                variant="outline-success"
                                onClick={sendAz}
                            >
                                Send
                            </Button>

                        </InputGroup>
                    </Row>
                    <Row className="align-items-center">
                        <InputGroup size="sm" className="mb-2">
                            <InputGroup.Text className="input-label">Nudge:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                size="sm"
                                id="inlineFormInputGroup"
                                value={nudgeVal}
                                onChange={(event) => { setNudgeVal(event.target.value) }}
                                placeholder="0" />
                            <Button
                                className="btnFormSend"
                                variant="outline-success"
                                onClick={sendNudge}
                            >
                                Send
                            </Button>

                        </InputGroup>
                    </Row>
                    <p />
                    <p />
                    
                    {/* <Row className="warnflag">
                        <Badge bg="success" size="sm">Read Error</Badge>
                    </Row>
                    <Row className="warnflag">
                        <Badge bg="success" size="sm">Shutter Error</Badge>
                    </Row> */}

                </Col>
                <Col style={{ border: 2 }} className="buttoncolumn2" lg={{ span: 2, offset: 2 }}>
                    <Row className="statlab">
                        <div className="connection" id="connection">
                            State: Disconnected
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="home" id="home">
                            Home: Unknown
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="shutter" id="shutter">
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
                        <div className="azimuth" id="azimuth">
                            Azimuth: 127
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="follow" id="follow">
                            Following: false
                        </div>
                    </Row>
                    <p />
                    <Row className="statlab">
                        <div className="busy" id="busy">
                            Dome Busy: false
                        </div>
                    </Row>
                </Col>
            </Row >
        </Form >

    )
}

export default DomeForm;