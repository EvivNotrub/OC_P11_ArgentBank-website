import './error.scss'
import { Link } from 'react-router-dom'

function Error() {

    document.title = "Page introuvable";

    return (
        <main className="error__main">
            <h1 className='error__main__title'>404</h1>
            <p className='error__main__message'>Oups! La page que vous demandez n´existe pas.</p>
            <Link className='error__main__lien' to="/">Retourner sur la page d´accueil</Link>
        </main>
    )
}
 
export default Error