import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim : true
    },

    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim : true
    },

    cedula : {type : String, required : true, trim : true, unique : true, sparse : true},

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim : true,
        lowercase  : true,
        // skipcq: JS-0097
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un correo válido']
    },

    password: {
        type: String,
        trim : true
    },

    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        trim : true
    },

    mascotas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mascota'
        }
    ],

    activo: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        collection: 'clientes'
    }
)

const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;