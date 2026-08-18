import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";

import Header from "./components/header";
import { stompClient } from "./services/stompClient";
import { RecordEntry } from "./context/RecordProvider";

type FeedMessage = {
    postId: string;
    creatorId: string;
    beforeImageUrl: string;
    afterImageUrl: string;
    beforeDate: string;
    afterDate: string;
    caption: string;
    createdAt: string;
};

export default function Feed() {

    const [messages, setMessages] = useState<FeedMessage[]>([]);
    const [connected, setConnected] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<RecordEntry | undefined>(undefined);
        
    function toggleAddRecord(open : boolean, record : RecordEntry | undefined) {
            setEditRecord(record);
            setOpen(open);
        }
    

    useEffect(() => {

        stompClient.onConnect = () => {

            console.log("Connected to STOMP");

            setConnected(true);

            stompClient.subscribe(
                "/topic/feed",
                message => {

                    console.log(
                        "Received:",
                        message.body
                    );

                    const post = JSON.parse(message.body);

                   const newMessage: FeedMessage = {
                        postId: post.postId,
                        creatorId: post.creatorId,
                        beforeImageUrl: post.beforeImageUrl,
                        afterImageUrl: post.afterImageUrl,
                        beforeDate: post.beforeDate,
                        afterDate: post.afterDate,
                        caption: post.caption,
                        createdAt: post.createdAt,
                    };

                    setMessages(currentMessages => [
                        newMessage,
                        ...currentMessages,
                    ]);
                }
            );
        };

        stompClient.onWebSocketClose = () => {
            setConnected(false);
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };

    }, []);

    function NewPost() {

        if (!stompClient.connected) {
            console.log(
                "Not connected to STOMP"
            );

            return;
        }

        stompClient.publish({
            destination: "/app/test",
            body: "Hello from Expo!",
        });
    }

    return (
        <>
            <Header setOpen={toggleAddRecord}/>
            

            <View style={styles.statusContainer}>

                <View
                    style={[
                        styles.statusDot,
                        connected
                            ? styles.connected
                            : styles.disconnected,
                    ]}
                />

                <Text style={styles.statusText}>
                    {connected
                        ? "WebSocket connected"
                        : "Connecting..."
                    }
                </Text>

            </View>

            <ScrollView
                style={styles.feed}
                showsVerticalScrollIndicator={false}
            >

                {messages.length === 0 && (

                    <View style={styles.emptyContainer}>

                        <Text style={styles.emptyTitle}>
                            No messages yet
                        </Text>

                        <Text style={styles.emptyText}>
                            Send a test message to check
                            your WebSocket connection.
                        </Text>

                    </View>

                )}

                {messages.map(message => (

                    <View
                        key={message.postId}
                        style={styles.messageCard}
                    >

                        <Text style={styles.messageLabel}>
                            WebSocket message
                        </Text>

                        <Text style={styles.messageText}>
                            {message.caption}
                        </Text>

                    </View>

                ))}

            </ScrollView>

            <View style={styles.buttonContainer}>

                <Pressable
                    style={styles.button}
                    onPress={NewPost}
                >

                    <Text style={styles.buttonText}>
                        Post Progress Photo
                    </Text>

                </Pressable>

            </View>
        </>
    );
}

const styles = StyleSheet.create({

    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#111",
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    connected: {
        backgroundColor: "#36D17C",
    },

    disconnected: {
        backgroundColor: "#E84C4C",
    },

    statusText: {
        color: "white",
        fontSize: 14,
    },

    feed: {
        flex: 1,
        paddingHorizontal: 15,
    },

    emptyContainer: {
        alignItems: "center",
        paddingTop: 100,
    },

    emptyTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },

    emptyText: {
        color: "#888",
        textAlign: "center",
        fontSize: 14,
    },

    messageCard: {
        backgroundColor: "#181818",
        borderRadius: 15,
        padding: 16,
        marginTop: 12,
    },

    messageLabel: {
        color: "#888",
        fontSize: 12,
        marginBottom: 6,
    },

    messageText: {
        color: "white",
        fontSize: 16,
    },

    buttonContainer: {
        padding: 15,
        backgroundColor: "#111",
    },

    button: {
        backgroundColor: "#36D17C",
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: "center",
    },

    buttonText: {
        color: "#111",
        fontSize: 16,
        fontWeight: "bold",
    },

});
