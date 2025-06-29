import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Animated, { FadeIn } from "react-native-reanimated";

const Welcome = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* login button & image */}
                <View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Typo fontWeight="500">Sign in</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require("../../assets/images/welcome.png")}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.footer}>
                    <Animated.View
                        entering={FadeIn.duration(1000)
                            .delay(100)
                            .springify()
                            .damping(12)}
                        style={{ alignItems: "center", gap: 2 }}
                    >
                        <Typo size={30} fontWeight={"800"}>
                            Always take control
                        </Typo>
                        <Typo size={30} fontWeight={"800"}>
                            of your finances
                        </Typo>
                    </Animated.View>

                    <View style={{ alignItems: "center", gap: 2 }}>
                        <Typo size={17} color={colors.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLight}>
                            lifestyle in future
                        </Typo>
                    </View>

                    <Animated.View
                        entering={FadeIn.duration(1000)
                            .delay(200)
                            .springify()
                            .damping(12)}
                        style={styles.buttonContainer}
                    >
                        <Button>
                            <Typo size={22} color={colors.neutral900}>
                                Get Started
                            </Typo>
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    welcomeImage: {
        height: verticalScale(300),
        width: "100%",
        alignSelf: "center",
        marginTop: verticalScale(100),
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
    },
    footer: {
        backgroundColor: colors.neutral900,
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: "white",
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowOpacity: 0.15,
        shadowRadius: 25,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
    },
});
