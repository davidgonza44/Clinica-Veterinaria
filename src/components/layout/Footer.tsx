import { Space } from "antd"
import dogIcon from "../../assets/images/icons/01-dog-icon.svg"

const Footer = () => {
    return (
        <footer>
            <div className='grid grid-cols-4'>
                <Space direction="vertical" size={12}>
                    <img src={dogIcon} alt= "perro" />
                </Space>

                <div>

                </div>

                <div>

                </div>

                <div>

                </div>

            </div>
        </footer>
    )
}

export default Footer