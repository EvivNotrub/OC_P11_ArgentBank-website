import './banner.scss'


function Banner() {
    return (
        <section className="banner">
            <img className="banner__img" src="./src/assets/images/bank-tree.jpeg" alt="litle bank tree" />
            <div className="banner__promoted">
                <p className="heading-style">
                    No fees.
                    <br />No minimum deposit.
                    <br />High interest rates.
                </p>
                <p className="banner__promoted__text">Open a savings account with Argent Bank today!</p>
            </div>
        </section>
    )
}

export default Banner
