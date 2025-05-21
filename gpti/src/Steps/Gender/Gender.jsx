import React from 'react';
import './Gender.css';
import maleIcon from '../../assets/GenderImgs/male.svg';
import femaleIcon from '../../assets/GenderImgs/female.svg';

const generos = [
  { id: 'masculino', nombre: 'Masculino', img: maleIcon },
  { id: 'femenino', nombre: 'Femenino', img: femaleIcon }
];

const GenderStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Elige tu sexo</h2>
      <div className="gender-grid">
        {generos.map((genero) => (
          <div
            key={genero.id}
            className={`gender-option ${
              formData.sexo === genero.id ? 'selected' : ''
            }`}
            onClick={() =>
              onChange({ target: { name: 'sexo', value: genero.id } })
            }
          >
            <div className="image-container">
              <img src={genero.img} alt={genero.nombre} />
            </div>            
            <p>{genero.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderStep;
