import { styled } from "@mui/material";

const TopAreaDiv = styled('div')(
    () => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        alignItems: "center",
        height: '80px',
        borderBottom: "1.7px solid #2c2c2c"
    })
)

export default TopAreaDiv;