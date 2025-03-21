import jwt  from "jsonwebtoken"

const generateToken = (res , clientId) => {
    const token = jwt.sign(clientId , process.env.JWT_SECRET, {
        expiresIn : "30d",
    })

    res.cookie("token", token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge : 3600000
    })
}

export default generateToken