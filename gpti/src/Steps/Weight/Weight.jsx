import React from 'react';
import './Weight.css';
import ligeroIcon from '../../assets/BodyImgs/ligero.png';
import medioIcon from '../../assets/BodyImgs/medio.png';
import pesadoIcon from '../../assets/BodyImgs/pesado.png';
import superPesadoIcon from '../../assets/BodyImgs/super_pesado.png';

const categoriasPesoPorDeporte = {
  muaythai: {
    all: [
      { id: 'miniflyweight', valor: '47.6', unidad: 'kg', descripcion: 'Miniflyweight' },
      { id: 'jr_flyweight', valor: '49.0', unidad: 'kg', descripcion: 'Jr. Flyweight' },
      { id: 'flyweight', valor: '50.8', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'jr_bantamweight', valor: '52.2', unidad: 'kg', descripcion: 'Jr. Bantamweight' },
      { id: 'bantamweight', valor: '53.5', unidad: 'kg', descripcion: 'Bantamweight' },
      { id: 'jr_featherweight', valor: '55.3', unidad: 'kg', descripcion: 'Jr. Featherweight' },
      { id: 'featherweight', valor: '57.2', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'jr_lightweight', valor: '59.0', unidad: 'kg', descripcion: 'Jr. Lightweight' },
      { id: 'lightweight', valor: '61.2', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'jr_welterweight', valor: '63.5', unidad: 'kg', descripcion: 'Jr. Welterweight' },
      { id: 'welterweight', valor: '66.7', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'jr_middleweight', valor: '69.9', unidad: 'kg', descripcion: 'Jr. Middleweight' },
      { id: 'middleweight', valor: '72.6', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'super_middleweight', valor: '76.2', unidad: 'kg', descripcion: 'Super Middleweight' },
      { id: 'light_heavyweight', valor: '79.4', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'cruiserweight', valor: '90.7', unidad: 'kg', descripcion: 'Cruiserweight' },
      { id: 'heavyweight', valor: '> 90.7', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
  },

  judo: {
    male: [
      { id: '60kg', valor: '< 60', unidad: 'kg', descripcion: '' },
      { id: '66kg', valor: '< 66', unidad: 'kg', descripcion: '' },
      { id: '73kg', valor: '< 73', unidad: 'kg', descripcion: '' },
      { id: '81kg', valor: '< 81', unidad: 'kg', descripcion: '' },
      { id: '90kg', valor: '< 90', unidad: 'kg', descripcion: '' },
      { id: '100kg', valor: '< 100', unidad: 'kg', descripcion: '' },
      { id: 'plus100kg', valor: '> 100', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '48kg', valor: '< 48', unidad: 'kg', descripcion: '' },
      { id: '52kg', valor: '< 52', unidad: 'kg', descripcion: '' },
      { id: '57kg', valor: '< 57', unidad: 'kg', descripcion: '' },
      { id: '63kg', valor: '< 63', unidad: 'kg', descripcion: '' },
      { id: '70kg', valor: '< 70', unidad: 'kg', descripcion: '' },
      { id: '78kg', valor: '< 78', unidad: 'kg', descripcion: '' },
      { id: 'plus78kg', valor: '> 78', unidad: 'kg', descripcion: '' },
    ],
  },

  taekwondo: {
    male: [
      { id: 'flyweight', valor: '58', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '68', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'welterweight', valor: '80', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', valor: '> 80', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
    female: [
      { id: 'flyweight', valor: '49', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '57', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'welterweight', valor: '67', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', valor: '> 67', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
  },

  wrestling: {
    male: [
      { id: '57kg', valor: '57', unidad: 'kg', descripcion: '' },
      { id: '65kg', valor: '65', unidad: 'kg', descripcion: '' },
      { id: '74kg', valor: '74', unidad: 'kg', descripcion: '' },
      { id: '86kg', valor: '86', unidad: 'kg', descripcion: '' },
      { id: '97kg', valor: '97', unidad: 'kg', descripcion: '' },
      { id: '125kg', valor: '125', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '50kg', valor: '50', unidad: 'kg', descripcion: '' },
      { id: '53kg', valor: '53', unidad: 'kg', descripcion: '' },
      { id: '57kg', valor: '57', unidad: 'kg', descripcion: '' },
      { id: '62kg', valor: '62', unidad: 'kg', descripcion: '' },
      { id: '68kg', valor: '68', unidad: 'kg', descripcion: '' },
      { id: '76kg', valor: '76', unidad: 'kg', descripcion: '' },
    ],
  },

  weightlifting: {
    male: [
      { id: '61kg', valor: '61', unidad: 'kg', descripcion: '' },
      { id: '73kg', valor: '73', unidad: 'kg', descripcion: '' },
      { id: '89kg', valor: '89', unidad: 'kg', descripcion: '' },
      { id: '102kg', valor: '102', unidad: 'kg', descripcion: '' },
      { id: 'plus102kg', valor: '> 102', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '49kg', valor: '49', unidad: 'kg', descripcion: '' },
      { id: '59kg', valor: '59', unidad: 'kg', descripcion: '' },
      { id: '71kg', valor: '71', unidad: 'kg', descripcion: '' },
      { id: '81kg', valor: '81', unidad: 'kg', descripcion: '' },
      { id: 'plus81kg', valor: '> 81', unidad: 'kg', descripcion: '' },
    ],
  },

  boxing: {
    male: [
      { id: 'flyweight', valor: '52', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '57', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'lightweight', valor: '63', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'welterweight', valor: '69', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'middleweight', valor: '75', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', valor: '81', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', valor: '91', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', valor: '> 91', unidad: 'kg', descripcion: 'Super Heavyweight' },
    ],
    female: [
      { id: 'flyweight', valor: '≤ 48', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'bantamweight', valor: '51', unidad: 'kg', descripcion: 'Bantamweight' },
      { id: 'featherweight', valor: '54', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'lightweight', valor: '57', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'light_welterweight', valor: '60', unidad: 'kg', descripcion: 'Light Welterweight' },
      { id: 'welterweight', valor: '64', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'middleweight', valor: '69', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', valor: '75', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', valor: '81', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', valor: '> 81', unidad: 'kg', descripcion: 'Super Heavyweight' },
    ],
  },

  horseracing: {
    all: [
      { id: 'lightweight', valor: '≤ 72.9', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'middleweight', valor: '73 - 90.9', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'heavyweight', valor: '> 91', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'junior', valor: '≤ 17', unidad: 'años', descripcion: 'Junior' },
    ]
  }
};



const WeightStep = ({ formData, onChange }) => {
  const { deporte, sexo } = formData;
  let categorias = [];

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
    categorias = [
      { id: 'ligero', nombre: 'Ligero', descripcion: 'menos de 60kg', icon: ligeroIcon },
      { id: 'medio', nombre: 'Medio', descripcion: '60–75kg', icon: medioIcon },
      { id: 'pesado', nombre: 'Pesado', descripcion: '75–90kg', icon: pesadoIcon },
      { id: 'super_pesado', nombre: 'Súper pesado', descripcion: 'más de 90kg', icon: superPesadoIcon }
    ];
  }

  const hasAtleastOneDescription = categorias.some(
    cat => cat.descripcion && cat.descripcion.trim() !== ''
  );

  // Encuentra el string más largo para ajustar el tamaño de fuente
  const maxLen = Math.max(...categorias.map(cat => cat.valor.length));
  // Puedes ajustar el tamaño base según el largo máximo
  const minWidth = Math.max(120, maxLen * 15 + 40);
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, ${minWidth}px)`,
    gap: '1.5rem',
    justifyItems: 'spaceBetween',
    width: '100%',
    padding: '1rem',
    justifyContent: 'center',
  };

  const cardStyle = {
    width: minWidth,
  }

  return (
    <div className="step-content">
      <h2 className="view-title">Categoría de peso</h2>
      <div className="peso-grid" style={gridStyle}>
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className={`peso-card ${formData.peso === cat.id ? 'selected' : ''}`}
            onClick={() => onChange({ target: { name: 'peso', value: cat.id } })}
            style={cardStyle}
          >
            <div className="peso-value-container">
              <div className="peso-value">{cat.valor}</div>
              {formData.peso === cat.id && (
                <span className="peso-check">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="14" fill="#fff" />
                    <path
                      d="M10 14l3 3 5-5"
                      stroke="#ffb612"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <div className="peso-unit">{cat.unidad}</div>
            </div>
            {hasAtleastOneDescription &&  <div className="peso-card-content">

              {cat.descripcion && <div className="peso-desc">{cat.descripcion}</div>}
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightStep;
