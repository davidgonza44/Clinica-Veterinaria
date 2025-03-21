import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
    fecha : { type : Date, required : true, default : Date.now },
    cliente : { type : mongoose.Schema.Types.ObjectId, ref : 'Cliente' },
    mascota : { type : mongoose.Schema.Types.ObjectId, ref : 'Mascota' },
    duracion : { type : Number, required : true, default : 30},

    motivo : { type : String , required : true, trim : true },
    estado : { type : String, required : true, enum : ['Pendiente' , 'En espera', 'En curso', 'Completada', 'Cancelada', 'No asistio'], trim : true, default : 'Programada' },
    tipo_cita :
    { type : String, required : true, enum : ['Consulta general', 'Consulta Veterinaria', 'Seguimiento', 'Cirugia', 'Urgencia', 'Otro'], trim : true },

    facturada : { type : Boolean, required : true, default : false },
    factura : { type : mongoose.Schema.Types.ObjectId, ref : 'Factura' },
    Veterinario : { type : mongoose.Schema.Types.ObjectId, ref : 'Veterinario', required : true },
    diagnostico : { type : String, trim : true },
    tratamiento_recomendado : { type : String, trim : true },

}, {
    timestamps : true
})
const Cita = mongoose.model('Cita', citaSchema);
export default Cita
