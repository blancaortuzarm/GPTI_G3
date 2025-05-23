import React from 'react';
import './Weight.css';
import ligeroIcon from '../../assets/BodyImgs/ligero.png';
import medioIcon from '../../assets/BodyImgs/medio.png';
import pesadoIcon from '../../assets/BodyImgs/pesado.png';
import superPesadoIcon from '../../assets/BodyImgs/super_pesado.png';

const categoriasPesoPorDeporte = {
  muaythai: {
    all: [
      { id: 'miniflyweight', nombre: '47.6 kg', descripcion: 'Miniflyweight' },
      { id: 'jr_flyweight', nombre: '49.0 kg', descripcion: 'Jr. Flyweight' },
      { id: 'flyweight', nombre: '50.8 kg', descripcion: 'Flyweight' },
      { id: 'jr_bantamweight', nombre: '52.2 kg', descripcion: 'Jr. Bantamweight' },
      { id: 'bantamweight', nombre: '53.5 kg', descripcion: 'Bantamweight' },
      { id: 'jr_featherweight', nombre: '55.3 kg', descripcion: 'Jr. Featherweight' },
      { id: 'featherweight', nombre: '57.2 kg', descripcion: 'Featherweight' },
      { id: 'jr_lightweight', nombre: '59.0 kg', descripcion: 'Jr. Lightweight' },
      { id: 'lightweight', nombre: '61.2 kg', descripcion: 'Lightweight' },
      { id: 'jr_welterweight', nombre: '63.5 kg', descripcion: 'Jr. Welterweight' },
      { id: 'welterweight', nombre: '66.7 kg', descripcion: 'Welterweight' },
      { id: 'jr_middleweight', nombre: '69.9 kg', descripcion: 'Jr. Middleweight' },
      { id: 'middleweight', nombre: '72.6 kg', descripcion: 'Middleweight' },
      { id: 'super_middleweight', nombre: '76.2 kg', descripcion: 'Super Middleweight' },
      { id: 'light_heavyweight', nombre: '79.4 kg', descripcion: 'Light Heavyweight' },
      { id: 'cruiserweight', nombre: '90.7 kg', descripcion: 'Cruiserweight' },
      { id: 'heavyweight', nombre: '> 90.7 kg', descripcion: 'Heavyweight' },
    ],
  },

  judo: {
    male: [
      { id: '60kg', nombre: '60 kg', descripcion: '' },
      { id: '66kg', nombre: '66 kg', descripcion: '' },
      { id: '73kg', nombre: '73 kg', descripcion: '' },
      { id: '81kg', nombre: '81 kg', descripcion: '' },
      { id: '90kg', nombre: '90 kg', descripcion: '' },
      { id: '100kg', nombre: '100 kg', descripcion: '' },
      { id: 'plus100kg', nombre: '> 100 kg', descripcion: '' },
    ],
    female: [
      { id: '48kg', nombre: '48 kg', descripcion: '' },
      { id: '52kg', nombre: '52 kg', descripcion: '' },
      { id: '57kg', nombre: '57 kg', descripcion: '' },
      { id: '63kg', nombre: '63 kg', descripcion: '' },
      { id: '70kg', nombre: '70 kg', descripcion: '' },
      { id: '78kg', nombre: '78 kg', descripcion: '' },
      { id: 'plus78kg', nombre: '> 78 kg', descripcion: '' },
    ],
  },

  taekwondo: {
    male: [
      { id: 'flyweight', nombre: '58 kg', descripcion: 'Flyweight' },
      { id: 'featherweight', nombre: '68 kg', descripcion: 'Featherweight' },
      { id: 'welterweight', nombre: '80 kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', nombre: '> 80 kg', descripcion: 'Heavyweight' },
    ],
    female: [
      { id: 'flyweight', nombre: '49 kg', descripcion: 'Flyweight' },
      { id: 'featherweight', nombre: '57 kg', descripcion: 'Featherweight' },
      { id: 'welterweight', nombre: '67 kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', nombre: '> 67 kg', descripcion: 'Heavyweight' },
    ],
  },

  wrestling: {
    male: [
      { id: '57kg', nombre: '57 kg', descripcion: '' },
      { id: '65kg', nombre: '65 kg', descripcion: '' },
      { id: '74kg', nombre: '74 kg', descripcion: '' },
      { id: '86kg', nombre: '86 kg', descripcion: '' },
      { id: '97kg', nombre: '97 kg', descripcion: '' },
      { id: '125kg', nombre: '125 kg', descripcion: '' },
    ],
    female: [
      { id: '50kg', nombre: '50 kg', descripcion: '' },
      { id: '53kg', nombre: '53 kg', descripcion: '' },
      { id: '57kg', nombre: '57 kg', descripcion: '' },
      { id: '62kg', nombre: '62 kg', descripcion: '' },
      { id: '68kg', nombre: '68 kg', descripcion: '' },
      { id: '76kg', nombre: '76 kg', descripcion: '' },
    ],
  },

  weightlifting: {
    male: [
      { id: '61kg', nombre: '61 kg', descripcion: '' },
      { id: '73kg', nombre: '73 kg', descripcion: '' },
      { id: '89kg', nombre: '89 kg', descripcion: '' },
      { id: '102kg', nombre: '102 kg', descripcion: '' },
      { id: 'plus102kg', nombre: '> 102 kg', descripcion: '' },
    ],
    female: [
      { id: '49kg', nombre: '49 kg', descripcion: '' },
      { id: '59kg', nombre: '59 kg', descripcion: '' },
      { id: '71kg', nombre: '71 kg', descripcion: '' },
      { id: '81kg', nombre: '81 kg', descripcion: '' },
      { id: 'plus81kg', nombre: '> 81 kg', descripcion: '' },
    ],
  },

  boxing: {
    male: [
      { id: 'flyweight', nombre: '52 kg', descripcion: 'Flyweight' },
      { id: 'featherweight', nombre: '57 kg', descripcion: 'Featherweight' },
      { id: 'lightweight', nombre: '63 kg', descripcion: 'Lightweight' },
      { id: 'welterweight', nombre: '69 kg', descripcion: 'Welterweight' },
      { id: 'middleweight', nombre: '75 kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', nombre: '81 kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', nombre: '91 kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', nombre: '> 91 kg', descripcion: 'Super Heavyweight' },
    ],
    female: [
      { id: 'flyweight', nombre: '48 kg', descripcion: 'Flyweight' },
      { id: 'bantamweight', nombre: '51 kg', descripcion: 'Bantamweight' },
      { id: 'featherweight', nombre: '54 kg', descripcion: 'Featherweight' },
      { id: 'lightweight', nombre: '57 kg', descripcion: 'Lightweight' },
      { id: 'light_welterweight', nombre: '60 kg', descripcion: 'Light Welterweight' },
      { id: 'welterweight', nombre: '64 kg', descripcion: 'Welterweight' },
      { id: 'middleweight', nombre: '69 kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', nombre: '75 kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', nombre: '81 kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', nombre: '> 81 kg', descripcion: 'Super Heavyweight' },
    ],
  },

  horseracing: {
    all: [
      { id: 'lightweight', nombre: '≤ 72.9 kg', descripcion: 'Lightweight' },
      { id: 'middleweight', nombre: '73 – 90.9 kg', descripcion: 'Middleweight' },
      { id: 'heavyweight', nombre: '> 91 kg', descripcion: 'Heavyweight' },
      { id: 'junior', nombre: '≤ 17 años', descripcion: 'Junior' },
    ],
  },
};



const WeightStep = ({ formData, onChange }) => {
  const { deporte, sexo } = formData;


  if (deporte && categoriasPesoPorDeporte[deporte]) {
    const catDeporte = categoriasPesoPorDeporte[deporte];

    if (catDeporte.all) {
      categorias = catDeporte.all;
    } else if (sexo === 'male' || sexo === 'hombre' || sexo === 'masculino') {
      categorias = catDeporte.male || [];
    } else if (sexo === 'female' || sexo === 'mujer' || sexo === 'femenino') {
      categorias = catDeporte.female || [];
    }
  }

  if (categoriasPesoPorDeporte[deporte].length === 0) {
    categoriasPesoPorDeporte[deporte] = [
      { id: 'ligero', nombre: 'Ligero', descripcion: 'menos de 60kg', icon: ligeroIcon },
      { id: 'medio', nombre: 'Medio', descripcion: '60–75kg', icon: medioIcon },
      { id: 'pesado', nombre: 'Pesado', descripcion: '75–90kg', icon: pesadoIcon },
      { id: 'super_pesado', nombre: 'Súper pesado', descripcion: 'más de 90kg', icon: superPesadoIcon }
    ];
  }

  return (
    <div className="step-content">
      <h2 className="view-title">Categoría de peso</h2>
      <div className="peso-grid">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className={`peso-card ${formData.peso === cat.id ? 'selected' : ''}`}
            onClick={() => onChange({ target: { name: 'peso', value: cat.id } })}
          >
            {/* Texto grande y negrita para el número o rango */}
            <p className="peso-nombre">{cat.nombre}</p>
            {/* Descripción secundaria */}
            {cat.descripcion && <p className="peso-desc">{cat.descripcion}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightStep;
