import React from 'react';
import './Sport.css';
import boxingImg from '../../assets/SportImgs/boxing.svg'
import judoImg from '../../assets/SportImgs/judo.svg'
import wrestlingImg from '../../assets/SportImgs/wrestling.svg'
import taekwondoImg from '../../assets/SportImgs/taekwondo.svg'

import horseracingImg from '../../assets/SportImgs/horseracing.svg'
import weightliftingImg from '../../assets/SportImgs/weightlifting.svg'
import muaythaiImg from '../../assets/SportImgs/muaythai.svg'

const deportes = [
  { id: 'boxing', nombre: 'Boxeo', img: boxingImg, desc: 'Boxing' },
  { id: 'judo', nombre: 'Judo', img: judoImg },
  { id: 'wrestling', nombre: 'Lucha', img: wrestlingImg, desc: 'Wrestling' },
  { id: 'taekwondo', nombre: 'Taekwondo', img: taekwondoImg },

  { id: 'horseracing', nombre: 'Turf', img: horseracingImg, desc: 'Horse Racing' },
  { id: 'weightlifting', nombre: 'Halterofilia', img: weightliftingImg, desc: 'Weightlifting' },
  { id: 'muaythai', nombre: 'Muay Thai', img: muaythaiImg },
];

const SportStep = ({ formData, onChange }) => {
  console.log(formData);
  return (
    <div className="step-content">
      <h2 className="view-title">¿Cuál es el deporte que practicas?</h2>
      <div className="sports-grid">
        {deportes.map((deporte) => (
          <div
            key={deporte.id}
            className={`sport-card ${formData.deporte === deporte.id ? 'selected' : ''}`}
            onClick={() => onChange({ target: { name: 'deporte', value: deporte.id } })}
            tabIndex={0}
            role="button"
            aria-pressed={formData.deporte === deporte.id}
          >
            <div className="sport-img-container">
              <img src={deporte.img} alt={deporte.nombre} className="sport-img" />
              {formData.deporte === deporte.id && (
                <span className="sport-check">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="14" fill="#fff" />
                    <path d="M10 14l3 3 5-5" stroke="#ffb612" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
            <div className="sport-card-content">
              <div className="sport-title">{deporte.nombre}</div>
              {deporte.desc && <div className="sport-desc">{deporte.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportStep;
