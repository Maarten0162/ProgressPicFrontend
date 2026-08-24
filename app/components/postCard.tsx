import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FeedMessage } from "../feed";



type Props = {
    post: FeedMessage;
};

export default function PostCard({ post }: Props) {
    return (
        <View style={styles.card}>

            <View style={styles.images}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: post.beforeImageUrl }}
                        style={styles.image}
                    />

                    <Text style={styles.label}>Before</Text>
                    <Text style={styles.date}>
                        {new Date(post.beforeDate).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: post.afterImageUrl }}
                        style={styles.image}
                    />

                    <Text style={styles.label}>After</Text>
                    <Text style={styles.date}>
                        {new Date(post.afterDate).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <Text style={styles.caption}>
                {post.caption}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#181818",
        borderRadius: 15,
        padding: 12,
        marginBottom: 15,
    },

    images: {
        flexDirection: "row",
        gap: 8,
    },

    imageContainer: {
        flex: 1,
    },

    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
    },

    label: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 6,
    },

    date: {
        color: "#888",
        fontSize: 12,
        marginTop: 2,
    },

    caption: {
        color: "white",
        fontSize: 16,
        marginTop: 12,
    },
});