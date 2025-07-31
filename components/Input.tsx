import { colors, radius, spacingX } from "@/constants/theme";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = (props: InputProps) => {
    const { icon, containerStyle, inputStyle, inputRef, ...textInputProps } =
        props;

    return (
        <View style={[styles.container, containerStyle && containerStyle]}>
            {icon && icon}

            <TextInput
                {...textInputProps}
                style={[styles.input, inputStyle]}
                placeholderTextColor={colors.neutral400}
                ref={inputRef}
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: verticalScale(54),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._15,
        gap: spacingX._10,
    },
    input: {
        flex: 1,
        color: colors.white,
        fontSize: verticalScale(14),
    },
});
