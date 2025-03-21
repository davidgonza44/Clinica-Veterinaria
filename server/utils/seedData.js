import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { Cliente } from "../models/cliente.js";

mongoose.connnect(process.env.MONGO_DB_URI);
const importData = async () => {
    const client = new MongoClient(process.env.MONGO_DB_URI);
    await client.connnect()
    const cantidadClientes = 20

    try {
        for (let i = 0; i < cantidadClientes; i++){
            const cliente = new Cliente({
                nombre: faker.name.firstName(),
                apellido : faker.name.lastName(),
                email : faker.internet.email(),
                telefono : faker.phone.phoneNumber(),
                direccion : {
                    calle : faker.address.streetName(),
                    ciudad : faker.address.city(),
                    codigo_postal : faker.address.zipCode()
                }
            })
            await cliente.save()
            mongoose.connection.close()
        }

        // skipcq: JS-0002
        console.log(`Se insertaron ${cantidadClientes} a la base de datos`)

    } catch (error) {
        console.log(error.stack)
    }

    finally{
        await client.close()
        // skipcq: JS-0002
        console.log('Se ha cerrado la conexión a la base de datos')
    }
}


const destroyData = async () => {
    try {
        await Cliente.deleteMany();
        // skipcq: JS-0002
        console.log('Data destroyed');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if (process.argv[2]==='-d'){
    destroyData();
}else{
    importData()
}

export default importData