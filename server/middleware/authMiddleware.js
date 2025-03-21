import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import Cliente from '../mongodb/models/cliente.js';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await Cliente.findById(decoded.clienteId).select('-password');
            next();
        } catch (error) {
            console.error("Error al verificar el token:", error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

const admin = ( req , res , next ) => {
    if (req.user && req.user.isAdmin){
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

const veterinario = ( req, res, next ) => {
    if (req.user && req.user.isVeterinario){
        next()
    }

    else {
        res.status(401);
        throw new Error('Not authorized as a veterinarian')
    }
}


const recepcionista = ( req, res, next ) => {
    if (req.user && req.user.isRecepcionista){
        next()
    }

    else {
        res.status(401);
        throw new Error('Not authorized as a receptionist')
    }
}


export { protect, admin, recepcionista, veterinario }