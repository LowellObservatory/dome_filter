import { useState } from 'react';
import mqtt from "mqtt";

function useBrokerMQTT() {

    const [client, setClient] = useState(null);
    const [message, setMessage] = useState(null);

    function handleConnect() {
        const url = "ws://tanagra.lowell.edu:61614/mqtt";
        console.log(url);
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
        console.log(host);
        setClient(mqtt.connect(host, mqttOptions));
        console.log(client);
        if (client) {
            console.log(client);
        }

        if (client) {
            client.on("connect", () => {
                console.log("Connected");
                console.log(client);
            });
            client.on("error", (err) => {
                console.error("Connection error: ", err);
                client.end();
            });
            client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                const changed = message.toString();

                var parser = new DOMParser();
                var doc = parser.parseFromString(changed, 'text/xml');
                console.log((new XMLSerializer()).serializeToString(doc));
                setMessage(doc);

            });

        }
    };

    function handlePublish(topic, qos, payload) {
        if (client) {
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log("Publish error: ", error);
                }
            });
        }
    };

    return {
        message,
        handleConnect,
        handlePublish,
      };
}

export default useBrokerMQTT;