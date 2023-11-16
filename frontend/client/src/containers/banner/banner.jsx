import { useEffect, useState } from 'react'
import './banner.scss'
import image from '../../assets/images/bank-tree/bank-tree.webp'


function Banner() {

    const mainImgUrl = "https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree.webp";
    const [imgCdnSrc, setImgSrc] = useState(mainImgUrl);
    const [cdnError, setCdnError] = useState(false);

    useEffect(() => {
        async function fetchLogo() {
                const response = await fetch(mainImgUrl)
                if(response.ok) {
                    setImgSrc(response.url);
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
            setImgSrc(image);
        }
        if(!cdnError) {
            setImgSrc(imgCdnSrc);
        }
    }, [cdnError, imgCdnSrc])

    return (
        <section className="banner">
            <img
                className="banner__img"
                src={imgCdnSrc}
                sizes={cdnError ? "" : "100vw"}
                srcSet={cdnError ? "" : "https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-xx-small.webp 150w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-x-small.webp 304w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-small.webp 448w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-small-medium.webp 728w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-medium.webp 1090w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-medium-plus.webp 1120w, https://cdn.jsdelivr.net/gh/EvivNotrub/OC_P11_ArgentBank-website@main/frontend/client/src/assets/images/bank-tree/bank-tree-large.webp 1580w"}
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
