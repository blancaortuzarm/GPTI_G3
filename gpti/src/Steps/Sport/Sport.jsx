import React from 'react';
import './Sport.css';
import boxingImg from '../../assets/SportImgs/boxing.svg' 
import judoImg from '../../assets/SportImgs/judo.svg'
import wrestlingImg from '../../assets/SportImgs/wrestling.svg'
import taekwondoImg from '../../assets/SportImgs/taekwondo.svg'

const deportes = [
  { id: 'boxing', nombre: 'Boxing', img: boxingImg},
  { id: 'judo', nombre: 'Judo', img: judoImg },
  { id: 'wrestling', nombre: 'Lucha', img: wrestlingImg },
  { id: 'taekwondo', nombre: 'Taekwondo', img: taekwondoImg },
  { id: 'running', nombre: 'Running', img: '/images/running.jpg' },
  { id: 'crossfit', nombre: 'CrossFit', img: '/images/crossfit.jpg' }
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
            className={`sport-option ${
              formData.deporte === deporte.id ? 'selected' : ''
            }`}
            onClick={() =>
              onChange({ target: { name: 'deporte', value: deporte.id } })
            }
          >
            <img src={deporte.img} alt={deporte.nombre} />
            <p>{deporte.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportStep;
