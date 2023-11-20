
import { useEffect, useState } from 'react'
import './header.scss'
import logo from '../../assets/images/argentBankLogo/argentBankLogo.webp'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation';

function Header() {
    const mainLogoUrl = "https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/argentBankLogo/argentBankLogo.webp";
    const [logoCdnSrc, setLogoSrc] = useState(mainLogoUrl);
    const [cdnError, setCdnError] = useState(false);

    useEffect(() => {
        async function fetchLogo() {
                const response = await fetch(mainLogoUrl)
                if(response.ok) {
                    setLogoSrc(response.url);
                    setCdnError(false);
                    return;
                }
                if(!response.ok) {
                    setCdnError(true);
                    return;
                }
        }
        fetchLogo();
    }
    ,[])

    useEffect(() => {
        if(cdnError) {
            setLogoSrc(logo);
        }
        if(!cdnError) {
            setLogoSrc(logoCdnSrc);
        }
    }, [cdnError, logoCdnSrc])

    return (
        <header className="header">
            <Link className='header__logo' to="/">
                <img
                    src={logoCdnSrc}
                    sizes={cdnError ? "" : '(min-width: 440px) 198px, 165px'}
                    srcSet={cdnError ? "" : "https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/argentBankLogo/argentBankLogo-small.webp 448w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/argentBankLogo/argentBankLogo-x-small.webp 304w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/argentBankLogo/argentBankLogo-xx-small.webp 150w"}
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
    
