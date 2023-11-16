import PropTypes from 'prop-types';
import "./feature.scss"

function Feature({content}) {

    return (
        <article key={content.id} className="feature">
            <img
                className='feature__icon'
                src={content.icon}
                sizes={content.iconSizes}
                srcSet={content.iconSrcSet}
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
        description: PropTypes.string
    }),
};

export default Feature