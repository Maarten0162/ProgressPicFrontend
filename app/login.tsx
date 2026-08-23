import React, { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import api from "./api/api";
import { useAuth } from "./context/AuthContext";


export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Missing information", "Please enter your email and password.");
            return;
        }

        try {
            setIsLoading(true);
                
            const response = await api.post('/api/auth/login',
                {
                    email,
                    password,
                }
            );

            await login(response.data);

        } catch (error) {
            Alert.alert(
                "Login failed",
                "Your email or password is incorrect."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.title}>ProgressPic</Text>
                <Text style={styles.subtitle}>
                    Track your progress
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Pressable
                        style={[
                            styles.loginButton,
                            isLoading && styles.disabledButton,
                        ]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.loginButtonText}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Text>
                    </Pressable>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        padding: 25,
    },

    content: {
        width: "100%",
    },

    title: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitle: {
        color: "#999",
        fontSize: 18,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 50,
    },

    form: {
        width: "100%",
    },

    label: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginLeft: 5,
    },

    input: {
        backgroundColor: "#222",
        color: "white",
        fontSize: 17,
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 15,
        marginBottom: 20,
    },

    loginButton: {
        backgroundColor: "white",
        borderRadius: 100,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
    },

    disabledButton: {
        opacity: 0.5,
    },

    loginButtonText: {
        color: "#111",
        fontSize: 18,
        fontWeight: "bold",
    },
});