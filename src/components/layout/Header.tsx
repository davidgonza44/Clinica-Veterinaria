import dogIcon from "../../assets/images/icons/01-dog-icon.svg"
import { Button } from 'antd'
import { Link } from 'react-router-dom'


const CustomHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm" >
            <div className="grid grid-cols-2 gap-4 py-0" >
                <div className="flex px-3 py-3 justify-start items-center" >
                    <img className="w-20 px-2" src={dogIcon} alt="perro" />
                    <span className="text-3xl px-2 py-4 font-semibold font-anton ">Pet Shop</span>
                </div>
                <div className="flex justify-end py-3 px-5 items-center" >
                    <Link to={''}>
                        <span className="text-xl px-4 text-zinc-600">Home</span>
                    </Link>
                    <Link to={''}>
                        <span className="text-xl px-4 text-zinc-600">Nosotros</span>
                    </Link>
                    <Link to={''}>
                        <span className="text-xl px-4 text-zinc-600">Productos</span>
                    </Link>
                    <Link to={''}>
                        <span className="text-xl px-4 text-zinc-600">Servicios</span>
                    </Link>
                    <Link to=''>
                        <Button size="large" shape="round" >Contacto</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default CustomHeader