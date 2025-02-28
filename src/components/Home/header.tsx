import dogIcon from "../../assets/images/icons/01-dog-icon.png"
const CustomHeader = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center" >
                <span ><img className="w-20 px-2" src={dogIcon} alt="perro" />   PetPals</span>
            </div>
            <div className="flex justify-end">
                <span className="text-2xl px-2">Home</span>
                <span className="text-2xl px-2">Nosotros</span>
                <span className="text-2xl px-2">Productos</span>
                <span className="text-2xl px-2">Servicios</span>
            </div>

        </div>
    )
}

export default CustomHeader