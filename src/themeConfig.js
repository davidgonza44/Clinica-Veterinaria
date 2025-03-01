import { RefineThemes } from "@refinedev/antd"


const AppTheme = {
    ...RefineThemes.dark,
    token : {
        fontFamily: "'Inter', sans-serif",
        colorPrimary: "yellow",
        colorError: "#ff4d4f",
        buttonHoverBackground: "yellow",
    }

}

export default AppTheme