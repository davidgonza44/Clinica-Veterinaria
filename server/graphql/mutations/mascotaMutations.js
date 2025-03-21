import { gql } from 'graphql-tag';

export const mascotaMutations = gql`
    type Mutation {
        createMascota(input: CreateMascotaInput!): Mascota
        updateMascota(input: UpdateMascotaInput!): Mascota
        deleteMascota(id: ID!): Mascota

        addHistoriaClinica(mascotaId : ID!, input : HistoriaClinicaInput!) : Mascota
        updateHistoriaClinica(mascotaId : ID!, input : HistorialClinicaInput!) : Mascota
        deleteHistoriaClinica(mascotaId : ID!, historiaId : ID!) : Mascota

        addAlergia()
        removeAlergia()
        addEnfermedad()
        removeEnfermedad()

        updateFotoPerfil(mascotaId : ID!, url : String!) : Mascota
        removeFotoPerfil(mascotaId : ID!) : Mascota

        registrarFallecimiento(mascotaId : ID!, input : FallecimientoInput!) : Mascota
        mascarEsterilizado(mascotaId : ID!) : Mascota

        cambiarPropietario(mascotaId : ID!, propietarioId : ID!) : Mascota
        cambiarVeterinario(mascotaId : ID!, veterinarioId : ID!) : Mascota


    }

`