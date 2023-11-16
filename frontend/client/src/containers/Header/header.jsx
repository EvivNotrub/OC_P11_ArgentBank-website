
import './header.scss'
import logo from '../../assets/images/argentBankLogo/argentBankLogo.webp'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation';



function Header() {

    return (
        <header className="header">
            <Link className='header__logo' to="/">
                <img
                    src={logo}
                    sizes='144px'
                    srcSet="./src/assets/images/argentBankLogo/argentBankLogo-small.webp 448w, ./src/assets/images/argentBankLogo/argentBankLogo-x-small.webp 304w, ./src/assets/images/argentBankLogo/argentBankLogo-xx-small.webp 150w"
                    alt="Argent Bank Logo"
                />
                <h1 aria-hidden="true" className='header__logo__title'>Argent Bank</h1>
            </Link>
            <nav className='header__nav'>
                <Navigation/>
            </nav>
        </header>
    )
}



export default Header
    
