import { Link } from 'react-router-dom'
import img_fritz from '../assets/fritz.png'
const SideBar = () => {

    return (
        <header>
            <div className="sidebar">
                <img src={img_fritz} className='max-w-30 mt-8'/>
                <Link to="/">
                    <h1 className='text-center'>Task </h1>
                </Link>

            </div>
        </header>
    )
}

export default SideBar