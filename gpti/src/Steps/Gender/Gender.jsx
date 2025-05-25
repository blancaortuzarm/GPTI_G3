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
            className={`gender-option ${formData.sexo === genero.id ? 'selected' : ''
              }`}
            onClick={() =>
              onChange({ target: { name: 'sexo', value: genero.id } })
            }
          >
            <div className="gender-img-container">
              <img src={genero.img} alt={genero.nombre} className="gender-img" />
              {formData.sexo === genero.id && (
                <span className="gender-check">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="14" fill="#fff" />
                    <path d="M10 14l3 3 5-5" stroke="#ffb612" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
            <div className="gender-card-content">
              <div className="gender-title">{genero.nombre}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderStep;
