import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
    nombre : { type : String, required : true, trim : true },
    precio : { type : Number, required : true, min : 0},
    stock : { type : Number, required : true, default : 1},
    disponible : { type : Boolean,  default : true},
    categoria : { type : String, required : true, enum : ['Medicamento', 'Alimento', 'Accesorio']},

    marca : { type : String, trim : true},
    imagen : { url : String, fecha_subida : { type : Date, default : Date.now } },

    veces_vendido : { type : Number, default : 0},
    impuesto : { type : Number, default : 0}

    },

    {
        timestamps : true
    }
)

const Producto = mongoose.model('Producto', productoSchema)
export default Producto