import mongoose from "mongoose";
const Schema = mongoose.Schema;

const veterinarioSchema = new Schema({
    empleado_id: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true,
        index: true
    },


    especialidad: {
        type: String,
        required: true,
        trim: true
    },

    biografia_profesional : {
        type: String,
        trim: true
    },

    consultas_realizadas : {
        type : Number,
        default : 0
    },

    mascotas_asignadas : [{
        type : Schema.Types.ObjectId,
        ref : 'Mascota'
    }],

    citas_pendientes : [{
        type : Schema.Types.ObjectId,
        ref : 'Cita'
    }],


    } ,

    {
        timestamps : true
    }
)


const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;