import { Show, useClerk, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Page() {

    const { user } = useUser();
    const { signOut } = useClerk();


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user?.firstName}</Text>
            <Show when="signed-out">
                <Link href="/(auth)/sign-in">
                    <Text>Sign In</Text>
                </Link>
            </Show>
            <Show when="signed-in">
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                <Pressable style={styles.button} onPress={() => signOut()}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </Pressable>
            </Show>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        gap: 16
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#0a7ea4",
        padding: 10,
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold"
    }
})