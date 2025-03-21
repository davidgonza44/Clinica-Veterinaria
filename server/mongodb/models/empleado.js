import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    nombre : { type : String, required : true, trim : true },
    apellido : { type : String, required : true, trim : true },
    cedula : { type : String, required : true, trim : true, unique : true },
    telefono : { type : Number, required : true, trim : true },
    email : { type : String, required : true, trim : true, unique : true, lowercase : true, index : true },
    fecha_nacimiento : Date,
    fecha_Contratacion : { type : Date, required : true },

    rol : { type : String, enum : ['admin', 'veterinario' , 'asistente', 'recepcionista', 'administrativo', 'lectura'], required : true, default : 'lectura' },

    permisos : {
        clientes : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },

        mascotas : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },
        citas : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },
        empleados : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },
        servicios : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },
        facturas : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        },
        historias : {
            crear : { type : Boolean, default : false },
            leer : { type : Boolean, default : true },
            actualizar : { type : Boolean, default : false },
            eliminar : { type : Boolean, default : false }
        }

    },

    estado : {
        type :String,
        enum : ['Activo', 'Inactivo', 'Baja Medica', 'Vacaciones', 'Despedido'],
        default : 'Activo', index : true
    },
    especialidad : { type : String,  trim : true },
},
{ timestamps : true }
)

empleadoSchema.pre('save', function(next){
    if (this.isNew || this.isModified('rol')){
        switch(this.rol){
            case 'admin':
                this.permisos = {
                    clientes : { crear : true, leer : true, actualizar : true, eliminar : true },
                    mascotas : { crear : true, leer : true, actualizar : true, eliminar : true },
                    citas : { crear : true, leer : true, actualizar : true, eliminar : true },
                    empleados : { crear : true, leer : true, actualizar : true, eliminar : true },
                    servicios : { crear : true, leer : true, actualizar : true, eliminar : true },
                    facturas : { crear : true, leer : true, actualizar : true, eliminar : true },
                    historias : { crear : true, leer : true, actualizar : true, eliminar : true }
                };
                break

            case 'veterinario':
                this.permisos = {
                    clientes : { crear : false, leer : true, actualizar : false, eliminar : false},
                    mascotas : { crear : true, leer : true, actualizar : true, eliminar : true},
                    citas : { crear : true, leer : true, actualizar : true, eliminar : false},
                    empleados : {crear : false, leer : false, actualizar : false, eliminar : false},
                    servicios : {crear : false, leer : false, actualizar : false, eliminar : false},
                    facturas : {crear : true, leer : true, actualizar : false, eliminar : false},
                    historias : { crear : true, leer : true, actualizar : true}
                };
                break

            case 'asistente':
                this.permisos = {
                    clientes : { crear : false, leer : true, actualizar : false, eliminar : false},
                    mascotas : { crear : false, leer : true, actualizar : true, eliminar : false},
                    citas : { crear : true, leer : true, actualizar : true, eliminar : false},
                    servicios : { crear : false, leer : true, actualizar : false, eliminar : false},
                    facturas : { crear : false, leer : false, actualizar : false, eliminar : false},
                    historias : { crear : false, leer : true, actualizar : false, eliminar : false},
                    empleados : {crear : false, leer : false, actualizar : false, eliminar : false},
                };
                break

            case 'administrativo':
                this.permisos = {
                    clientes : { crear : false, leer : false, actualizar : false, eliminar : false},
                    mascotas : { crear : false, leer : false, actualizar : false, eliminar : false},
                    citas : { crear : false, leer : false, actualizar : false, eliminar : false},
                    servicios : { crear : true, leer : true, actualizar : true, eliminar : false},
                    facturas : { crear : true, leer : true, actualizar : true, eliminar : false},
                    historias : { crear : false, leer : false, actualizar : false, eliminar : false},
                    empleados : {crear : false, leer : false, actualizar : false, eliminar : false},
                };
                break;

            case 'recepcionista':
                this.permisos = {
                    clientes : { crear : true, leer : true, actualizar : true, eliminar : false},
                    mascotas : { crear : true, leer : true, actualizar : true, eliminar : false},
                    citas : { crear : true, leer : true, actualizar : true, eliminar : false},
                    empleados : { crear : false, leer : false , actualizar : false, eliminar : false},
                    servicios : {crear : false, leer : true, actualizar : false, eliminar : false},
                    facturas : {crear : true, leer : true, actualizar : false, eliminar : false},
                    historias : { crear : true, leer : true, actualizar : true, eliminar : false}
                }
                break;

            default:
                this.permisos = {}
                break;
        }

        next()
    }
})


const Empleado = mongoose.model('Empleado', empleadoSchema);
export default Empleado