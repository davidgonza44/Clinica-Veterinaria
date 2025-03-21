import mongoose from "mongoose";
const Schema = mongoose.Schema;


const historiaClinicaSchema = new mongoose.Schema({
    fecha : { type : Date, required : true, default : Date.now },
    tipo_registro : { type : String, required : true, trim : true, enum : ['Consulta', 'Cirugia', 'Vacunacion', 'Hospitalizacion']},
    motivo : { type : String, required : true, trim : true},

    diagnostico : String,
    tratamiento_recomendado : String,
    medicamentos_recetados : [{nombre : String, dosis : String, frecuencia : String, duracion : String}],

    cita_relacionada : { type : Schema.Types.ObjectId, ref : 'Cita', index : true},
    veterinario : { type : Schema.Types.ObjectId, ref : 'Veterinario' , required : true, index : true},
})


const mascotaSchema = new mongoose.Schema({
    nombre : { type : String, required : true, trim : true },
    raza : { type: String, required : true, trim : true},
    edad : { type : Number, required : true, trim : true},
    color : { type : String, required : true, trim : true},
    peso : { type : Number, required : true, trim : true},
    sexo : { type : String, required : true, trim : true, enum : ["Macho", "Hembra"]},

    fecha_nacimiento : { type : Date},
    notas_relevantes : String,
    fallecido : { estado :  {type : Boolean, default : false}, fecha : Date, causa : String  },

    esterilizado : { type : Boolean, default : false},
    propietario : { type : mongoose.Schema.Types.ObjectId, ref : "Cliente" , required : true, index : true},
    veterinario : { type : mongoose.Schema.Types.ObjectId, ref : 'Veterinario', required : true, index : true},

    historia_Clinica : [historiaClinicaSchema],
    alergias : [String],
    enfermedades : [String],

    foto_perfil : { url : String, fecha_subida : { type : Date, default : Date.now }}

}, { timestamps : true })

const Mascota = mongoose.model('Mascota', mascotaSchema);
export default Mascota;