import Feature from "../../components/Feature/feature.jsx";
import features from "../../data/features.json";
import "./features.scss"

function Features() {

    return (
        <section className="features">
            {features?.map((feature) => 
                <Feature key={feature.id} content={feature}  />
            )}
        </section>
    )
}

export default Features;