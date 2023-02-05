import { useState, setState } from 'react';
import mqtt from "mqtt";

function useBrokerMQTT() {

    const [client, setClient] = useState(null);
    const [message, setMessage] = useState(null);

    function handleConnect() {
        const url = "ws://tanagra.lowell.edu:61614/mqtt";
        // console.log(url);
        const options = {
            keepalive: 30,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: "WillMsg",
                payload: "Connection Closed abnormally..!",
                qos: 0,
                retain: false,
            },
            clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
            username: "username",
            password: "password",
            rejectUnauthorized: false
        };

        doConnect(url, options);
    }

    function doConnect(host, mqttOptions) {
        // console.log(host);
        var c = mqtt.connect(host, mqttOptions);
        var parser = new DOMParser();
        setClient(c);

        if (c) {
            console.log("setting up onmessage");
            c.on("connect", () => {
                console.log("Connected");
                console.log(c);
            });
            c.on("error", (err) => {
                console.error("Connection error: ", err);
                c.end();
            });
            c.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                const changed = message.toString();
                // console.log("got a message");
                
                var doc = parser.parseFromString(changed, 'text/xml');
                // console.log((new XMLSerializer()).serializeToString(doc));
                setMessage(doc);

            });
        }

    };

    function handleSubscribe(topic, qos) {
        console.log("subscribing to: ");
        console.log(topic);
        if (client) {
            client.subscribe(topic, 0, (error) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
            });
        }
        
    }

    function handleUnsub(topic, qos) {
        if (client) {
            client.unsubscribe(topic, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
            });
        }
    };

    function handlePublish(topic, qos, payload) {
        // console.log(client);
        if (client) {
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log("Publish error: ", error);
                }
            });
        }
    };

    function handleDisconnect() {
        if (client) {
            client.end(() => {

            });
        }
    };

    return {
        client,
        message,
        handleConnect,
        handlePublish,
        handleSubscribe,
        handleUnsub,
        handleDisconnect
    };
}

export default useBrokerMQTT;