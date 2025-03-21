import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const lineaFacturaSchema = new Schema({
    tipo : {
        type : String,
        required : true,
        enum : ['Producto', 'Servicio'],
        trim : true
    },
    descripcion : {type :String, required : true, trim : true},
    cantidad : {type : Number, required : true, min : 1, default : 1},
    precio_unitario : {type : Number, required : true, min : 0},
    descuento : {type : Number, required : true, min : 0, max : 100, default : 0},
    subtotal : {type : Number, required : true, min : 0},
    impuesto : {type : Number, required : true, min : 0, default : 0}
})


const pagoSchema = new Schema({
    fecha : {type : Date, required : true, default : Date.now},
    monto : {type : Number, required : true, min : 0},
    metodo : {type : String, required : true, enum : ['Efectivo', 'Tarjeta', 'Transferencia', 'Cheque']},
    referencia : {type : String, trim : true}
})


const facturaSchema = new Schema({
    numero_Factura : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },

    serie : {
        type : String,
        default : 'A',
        trim : true
    },

    fecha_emision: {
        type : Date,
        default : Date.now
    },

    cliente_id : {
        type : Schema.Types.ObjectId,
        ref : 'Cliente',
    },

    items : [lineaFacturaSchema],

    mascota_id : {
        type : Schema.Types.ObjectId,
        ref : 'Mascota'
    },

    subtotal : { type : Number, required : true, min : 0},
    total_impuestos : { type : Number, required : true, min : 0 },
    total : { type : Number, required : true, min : 0 },

    metodo_pago : {type :String, required : true, enum : ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'Cheque']},
    estado_pago : {type : String, required : true, enum : ['Pendiente', 'Pagado', 'Cancelado', 'Pago Parcial'], default : 'Pendiente'},
    pagos : [pagoSchema],

    empleado_id : {type : Schema.Types.ObjectId, ref : 'Empleado'},

    referencias :{
        cita : {type : Schema.Types.ObjectId, ref : 'Cita'},
        historia_clinica : {type : Schema.Types.ObjectId, ref : 'HistoriaClinica'}
    }

})


const Factura = mongoose.model('Factura', facturaSchema);
export default Factura;