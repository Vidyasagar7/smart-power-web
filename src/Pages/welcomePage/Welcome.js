import React from 'react';
import "./Welcome.css";
import Bulb from '../../images/Bulb.jpg';
const Welcome = () => {
    return(
    <div className="welcomepage">
      <div className = "contentW">
        <div className="Para0">Your Ultimate Power Partner</div>
        <div className="Para1">
          Powering over 1 million homes, we are one of the largest electricity
          providers in coimbatore.Be it residential,commercial or industrial,we
          can provide electricity for all your needs.Manging power has never been
          made so easy.Monitoring power and bill payments are just a click away.
        </div>
        <div className="Para2">
          Already with us?,Just create a online account by clicking Register and you are all set to go...!
        </div>
        <div className="Para3">
          Join us and let us walk together for a better future..
        </div>
      </div>
        <img src = {Bulb} className="bulb" alt = ""/>
    </div>
    );
}

export default Welcome;