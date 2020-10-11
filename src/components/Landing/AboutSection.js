import React, {Component} from 'react';
import light from '../../images/light.png'

class AboutSection extends Component {

    render() {
    	return (
    		<div className="row">
                    <div className="col-lg-4">
                        <div className="description">
                             <h1 className="offer__title">О нас</h1>
                             <p className="offer__text">Благотворительный фонд «Огромное сердце»</p>
                         </div>
                     </div>
                    <div className="col-lg-8 col-lg-push-3">
                        <img className="img__style" src={light}/>
                    </div>
                </div>
    		);
    }
}
 
export default AboutSection;