import './banner.scss'


function Banner() {
    return (
        <section className="banner">
            <img
                className="banner__img"
                src="./src/assets/images/bank-tree/bank-tree.webp"
                sizes="100vw"
                srcSet="./src/assets/images/bank-tree/bank-tree-xx-small.webp 150w, ./src/assets/images/bank-tree/bank-tree-x-small.webp 304w, ./src/assets/images/bank-tree/bank-tree-small.webp 448w, ./src/assets/images/bank-tree/bank-tree-small-medium.webp 728w, ./src/assets/images/bank-tree/bank-tree-medium.webp 1090w, ./src/assets/images/bank-tree/bank-tree-medium-plus.webp 1120w, ./src/assets/images/bank-tree/bank-tree-large.webp 1580w"
                alt="litle bank tree"
                loading='eager' />
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
