import { OAuth2Client } from "google-auth-library";
import Empleado from "./mongodb/models/empleado.js";
import Cliente from "./mongodb/models/cliente.js";
import generateToken from "./utils/generateToken.js";
import bcrypt from "bcrypt"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const registerHandler = async(req,res) => {
    try {
        const { nombre , apellido, email, password, cedula, telefono } = req.body
        const clientExists = await Cliente.findOne({ email })

        if (clientExists){
            return res.status(400).json({
                success: false,
                message : "Correo electronico ya registrado"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const cliente = await Cliente.create({
            nombre,
            apellido,
            email,
            password : hashedPassword,
            cedula,
            telefono
        })

        if (cliente){
            generateToken(res, cliente._id)
            return res.status(201).json({
                success : true,
                message : "Registro exitoso",
                user : {
                    clienteId : cliente._id,
                    name : `${cliente.nombre} ${cliente.apellido}`,
                    email : cliente.email,
                    isCliente : true,
                    isEmpleado : false,
                    rol : 'invitado',
                    tokenExpiration : Date.now() + 3600000
                }
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Error en el servidor durante el registro"
        })
    }
}


export const loginHandler = async(req , res) => {
    try {
        const { email , password } = req.body
        const cliente = await Cliente.findOne({ email }).select('+password')

        if (!cliente){
            return res.status(401).json({
                success : false,
                message : "Correo o password incorrecto"
            })
        }

        const isMatch = await bcrypt.compare(password, cliente.password)

        if (!isMatch){
            return res.status(401).json({
                success : false,
                message : "Correo o password incorrecto"
            })
        }

        generateToken(res, cliente._id)
        return res.status(200).json({
            success : true,
            message : "Inicio de sesion exitoso",
            user : {
                clienteId : cliente._id,
                name : `${cliente.nombre} ${cliente.apellido}`,
                email : cliente.email,
                isCliente : true,
                isEmpleado : false,
                rol : "invitado",
                tokenExpiration : Date.now() + 3600000
            }
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Error en el servidor durante el inicio de sesion"
        })
    }
}

export const googleAuthHandler = async (req, res) => {
    try {
        console.log('AUTH REQUEST RECEIVED:', req.body);
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })


        const payload = ticket.getPayload()
        if (!payload) {
            return res.status(400).json({
                success: false,
                message: "Token no valido"
            })
        }

        let cliente = await Cliente.findOne({ email: payload.email })
        const empleado = await Empleado.findOne({ email: payload.email })
        console.log('entro aqui')

        if (!cliente){
            const firstName = payload.given_name || payload.name.split(' ')[0]
            const lastName = payload.family_name || payload.name.split(' ').slice(1).join(' ') || "Unknown"

            const nuevoCliente = new Cliente({
                nombre : firstName,
                apellido: lastName,
                email: payload.email,
                cedula : `TEMP-${Date.now()}-${Math.round(Math.random() * 10000)}`,
                telefono : 'Por completar',
            })

            try {
                cliente = await nuevoCliente.save()
                console.log("Nuevo cliente creado")
            } catch (error) {
                console.error("Error al guardar al cliente:", error)
                return res.status(400).json({
                        success: false,
                        message: "Error al crear el cliente",
                        error: error.message,
                        details: error.name === 'ValidationError' ? error.errors : null
                    })
            }
        }


        const tokenExpiration = 3600000
        res.cookie("token", req.body.credential, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: tokenExpiration,
            path: '/'
        })


        return res.status(200).json({
            success: true,
            message: "Token valido",
            user: {
                name: empleado ? `${empleado.nombre} ${empleado.apellido}` : payload.name,
                email: payload.email,
                picture: payload.picture,
                rol: empleado?.rol || "invitado",
                clienteId : cliente?._id,
                isCliente : Boolean(cliente),
                isEmpleado : Boolean(empleado),
                tokenExpiration : Date.now() + tokenExpiration
            }
        })
    } catch (error) {
        console.error("Error de autenticacion", error)
        return res.status(500).json({
            success: false,
            message: "Error en el servidor durante la autenticacion"
        })
    }
}

export const logoutHandler = (req, res) => {
    if (!req.cookies.token) {
        return res.status(400).json({
            success: false,
            message: "No hay token"
        })
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: '/'
    })

    return res.status(200).json({
        success: true,
        message: "Logout exitoso"
    })
}


export const checkAuthHandler = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json({
                success: false,
                message: "No hay token",
                authenticated: false
            })
        }

        const ticket = await client.verifyIdToken({
            idToken: req.cookies.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "Token no valido",
                authenticated: false
            })
        }
        const empleado = await Empleado.findOne({ email: payload.email })
        const permissions = empleado ? generarListaPermisos(empleado) : ['public : read']

        return res.status(200).json({
            success: true,
            authenticated: true,
            user: {
                name: empleado ? `${empleado.nombre} ${empleado.apellido}` : payload.name,
                email: payload.email,
                picture: payload.picture,
                rol: empleado?.rol || "invitado",
                permissions
            }
        })

    } catch (error) {
        console.error("Error de autenticacion", error)
        return res.status(500).json({
            success: false,
            message: "Error en el servidor durante la autenticacion",
            authenticated: false
        })
    }
}



export const getPermissionsHandler = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json({
                success: false,
                message: 'No hay token',
                authenticated: false
            })
        }
        const ticket = await client.verifyIdToken({
            idToken: req.cookies.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()

        if (!payload) {
            return res.status(401).json({
                success: false,
                message: 'Token no valido',
                authenticated: false
            })
        }

        const empleado = await Empleado.findOne({ email: payload.email })

        if (!empleado) {
            return res.status(200).json({
                success: true,
                permissions: ['public:read']
            })
        }

        if (empleado.estado !== 'Activo') {
            return res.status(200).json({
                success: true,
                permissions: ['public:read']
            })
        }

        const permissions = generarListaPermisos(empleado);
        return res.status(200).json({
            success: true,
            permissions
        })

    } catch (error) {
        console.error("Error al obtener permisos", error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor durante la obtencion de permisos',
        })
    }
}


const generarListaPermisos = (empleado) => {
    const permissions = ['app:access', 'profile:read', 'profile:update']

    // skipcq: JS-0047
    switch (empleado.rol) {
        case 'admin':
            permissions.push('admin:access');
            break;
        case 'veterinario':
            permissions.push('vet:access');
            break;
        case 'recepcionista':
            permissions.push('reception:access');
            break;
        case 'administrativo':
            permissions.push('finance:access')
            break;
        case 'asistente':
            permissions.push('assistant:access')
            break;
    }

    if (empleado.permisos){
        const modulos = ['clientes', 'mascotas', 'citas', 'facturas', 'empleados', 'servicios', 'historias']
        const acciones = ['crear' , 'leer', 'actualizar', 'eliminar']

        modulos.forEach(modulo => {
            if (!empleado.permisos[modulo]) return;

            acciones.forEach(accion => {
                if (empleado.permisos[modulo][accion]){
                    let accionFormatted = accion
                    if (accion === 'crear') accionFormatted = 'create'
                    if (accion === 'eliminar') accionFormatted = 'delete'
                    if (accion === 'actualizar') accionFormatted = 'update'
                    if (accion === 'leer') accionFormatted = 'read'
                    permissions.push(`${modulo}:${accionFormatted}`)
                }
            })
        })
    }

    return [...new Set(permissions)]
}