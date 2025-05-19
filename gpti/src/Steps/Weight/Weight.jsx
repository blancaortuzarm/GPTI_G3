import React from 'react';
import './Weight.css';
import ligeroIcon from '../../assets/BodyImgs/ligero.png';
import medioIcon from '../../assets/BodyImgs/medio.png';
import pesadoIcon from '../../assets/BodyImgs/pesado.png';
import superPesadoIcon from '../../assets/BodyImgs/super_pesado.png';

const categoriasPeso = [
  { id: 'ligero', nombre: 'Ligero', descripcion: 'menos de 60kg', icon: ligeroIcon },
  { id: 'medio', nombre: 'Medio', descripcion: '60–75kg', icon: medioIcon },
  { id: 'pesado', nombre: 'Pesado', descripcion: '75–90kg', icon: pesadoIcon },
  { id: 'super_pesado', nombre: 'Súper pesado', descripcion: 'más de 90kg', icon: superPesadoIcon }
];

const WeightStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Categoría de peso</h2>
      <div className="peso-grid">
        {categoriasPeso.map((cat) => (
          <div
            key={cat.id}
            className={`peso-card ${
              formData.peso === cat.id ? 'selected' : ''
            }`}
            onClick={() =>
              onChange({ target: { name: 'peso', value: cat.id } })
            }
          >
            <img src={cat.icon} alt={cat.nombre} className="peso-icon" />
            <p className="peso-nombre">{cat.nombre}</p>
            <p className="peso-desc">{cat.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightStep;
