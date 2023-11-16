import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import "./feature.scss"

function Feature({content}) {

    const [imageCdnSrc, setLogoSrc] = useState(content.iconCDN);
    const [cdnError, setCdnError] = useState(false);

    useEffect(() => {
        async function fetchLogo() {
                const response = await fetch(content.iconCDN)
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
    ,[content.iconCDN])

    useEffect(() => {
        if(cdnError) {
            setLogoSrc(content.icon);
        }
        if(!cdnError) {
            setLogoSrc(imageCdnSrc);
        }
    }, [cdnError, content.icon, imageCdnSrc])

    return (
        <article key={content.id} className="feature">
            <img
                className='feature__icon'
                src={imageCdnSrc}
                sizes={cdnError ? "" : content.iconSizes}
                srcSet={cdnError ? "" : content.iconSrcSet}
                alt="icon messages"
                loading='lazy'
            />
            <h2 className='feature__title'>{content.title}</h2>
            <p className='feature__text'>{content.description}</p>
        </article>
    )
}
//can you help me define proptype validation?
Feature.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        icon: PropTypes.string,
        iconSizes: PropTypes.string,
        iconSrcSet: PropTypes.string,
        description: PropTypes.string,
        iconCDN: PropTypes.string,
    }),
};

export default Feature