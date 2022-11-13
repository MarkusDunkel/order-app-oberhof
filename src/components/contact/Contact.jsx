import React from 'react';
import './Contact.css';

const ContactForm = ({progress, contact, onEnt}) => {
  if (progress.continueContact) {
    let con = {...contact};
    for (const [key, value] of Object.entries(con)) {
      if (!value) {con[key]=""}
    }
    return (
      <fieldset>
        <legend> Nenne uns deine Kontakdaten </legend>
        <form className="form-contact">
          <div className="subform-contact">
            <label for="forname">Vorname:</label><br />
            <input type="text" id="forname" name="forname" value={con.forname} onChange={onEnt} />
          </div>
          <div className="subform-contact" >
            <label for="surname">Familienname:</label><br />
            <input type="text" id="surname" name="surname" value={con.surname} onChange={onEnt} />
          </div>
          <div className="subform-contact">
            <label for="email">Email:</label><br />
            <input type="text" id="email" name="email" value={con.email} onChange={onEnt} />
          </div>
          <div className="subform-contact" >
            <label for="phone">Telefon:</label><br />
            <input type="text" id="phone" name="phone" value={con.phone} onChange={onEnt} />
          </div>
        </form> 
        <div className="text-contact">
          Deine Daten werden mit hohen Sicherheitsstandards gespeichert. Die Angabe der Telefonnummer ist nur verpflichtend, wenn zu dir nach Hause geliefert wird. 30 Tage nach dem Datum der Zustellung werden die Kontaktdaten automatisch gelöscht. 
        </div>
      </fieldset>
    );
  }
}

export default ContactForm