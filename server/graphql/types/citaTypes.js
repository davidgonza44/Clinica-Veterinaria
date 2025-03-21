import { gql } from "graphql-tag";

const citaTypes = gql`
    enum EstadoCita {
        PENDIENTE
        EN_ESPERA
        EN_CURSO
        COMPLETADA
        CANCELADA
        NO_ASISTIO
    }

    enum TipoCita {
        CONSULTA_GENERAL
        CONSULTA_VETERINARIA
        Seguimiento
        CIRUGIA
        URGENCIA
        OTRO

    }

    input CitaInput {
        fecha : Date!
        clienteId : ID!
        mascotaId : ID!
        duracion : Int
        motivo : String!
        estado : EstadoCita
        tipo_cita : TipoCita!
        veterinarioId : ID!
        diagnostico : String
        tratamiento_recomendado : String
    }

    input ActualizarCitaInput {
        id : ID!
        fecha : Date!
        clienteId : ID
        mascotaId : ID
        duracion : Int
        motivo : String
        estado : EstadoCita
        tipo_cita : TipoCita
        veterinarioId : id
        diagnostico : String
        tratamiento_recomendado : String
        factura : Boolean
        facturaId : ID
    }

    type Cita{
        id : ID!
        fecha : Date!
        cliente : Cliente!
        mascota : Mascota!
        estado : EstadoCita!
        duracion : Int!
        veterinario : Veterinario!
        tipo_cita : TipoCita!
        facturada : Boolean!
        factura : Factura
        tratamiento_recomendado : String!
        observaciones : String!
        tratamiento_recomendado : String
        diagnostico : String
        createdAt : Date!
        updatedAt : Date!
    }`