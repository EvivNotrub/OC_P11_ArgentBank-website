import './home.scss'
import Banner from '../../containers/banner/banner.jsx'
import Features from '../../containers/Features/features';

function Home() {
    return (
        <main className="home">
            <Banner />
            <Features />
        </main>
    )
}

export default Home;