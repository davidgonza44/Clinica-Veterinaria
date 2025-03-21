import mongoose from "mongoose";

const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        trim : true
    },

    codigo : {
        type : String,
        unique : true,
        trim : true
    },

    descripcion : {
        type : String,
        trim : true
    },

    categoria : {
        type: String,
        required : true,
        enum : ["Consulta", "Cirugia", "Vacunacion", "Emergencia"],
        trim : true
    },

    precio : {
        type : Number,
        required : true
    },

    impuesto : {
        type : Number,
        default : 0.16
    },

    imagen : {
        url : String
    },

    //Estadisticas

    veces_realizado : {
        type : Number,
        default : 0
    },
    ultima_vez_realizado : {
        type : Date,
    }

    },

    {
        timestamps : true
    }
)

const Servicio = mongoose.model("Servicio", servicioSchema);
export default Servicio;