import './banner.scss'


function Banner() {
    return (
        <section className="banner">
            <img className="banner__img" src="./src/assets/images/bank-tree.jpeg" alt="litle bank tree" />
            <div className="banner__promoted">
                <p className="heading-style">No fees.</p>
                <p className="heading-style">No minimum deposit.</p>
                <p className="heading-style">High interest rates.</p>
                <p className="banner__promoted__text">Open a savings account with Argent Bank today!</p>
            </div>
        </section>
    )
}

export default Banner
