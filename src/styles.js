import { StyleSheet } from "react-native"
import * as Color from "./config.colors"

export default StyleSheet.create({
    body: {
        flex: 1,
        padding: 0,
        backgroundColor: Color.bodyBackground,
    },
    divider: {
        borderBottomColor: Color.listDivider,
        borderBottomWidth: 1,
    },
    dividerBig: {
        borderBottomColor: Color.listDivider,
        borderBottomWidth: 8,
    },
    listItem: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    listItemContainer: {
        paddingHorizontal: 4
    }
})