import React, { useState } from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import './AthleteCard.css';

const AthleteCard = ({ athlete, onCardClick }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getOverallRating = () => {
    const { comportamento = 5, compromisso = 5, escola = 5 } = athlete.evaluation || {};
    return Math.round((comportamento + compromisso + escola) / 3);
  };

  // Extrair apenas o primeiro nome
  const getFirstName = (fullName) => {
    if (!fullName) return 'Nome não informado';
    return fullName.split(' ')[0];
  };

  return (
    <div className="athlete-card-modern" onClick={() => onCardClick(athlete)}>
      <div className="card-background">
        {/* Header com logo do Internacional */}
        <div className="card-header-modern">
          <div className="inter-logo-small">SC</div>
          <div className="gigante-text">GIGANTE</div>
        </div>
        
        {/* Área da foto */}
        <div className="photo-area">
          {athlete.photo && !imageError ? (
            <img 
              src={athlete.photo} 
              alt={athlete.name}
              className="athlete-photo-modern"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="photo-placeholder-modern">
              <span>FOTO AQUI</span>
            </div>
          )}
        </div>
        
        {/* Área do nome */}
        <div className="name-area">
          <div className="name-background">
            <span className="athlete-name-modern">{getFirstName(athlete.name)}</span>
          </div>
        </div>
        
        {/* Área da posição */}
        <div className="position-area">
          <div className="position-background">
            <span className="position-text">{athlete.position || 'POSIÇÃO AQUI'}</span>
          </div>
        </div>
        
        {/* Logo do Internacional */}
        <div className="inter-logo-main">
          <div className="logo-circle">
            <span className="logo-text">SC INTERNACIONAL</span>
            <span className="logo-year">1909</span>
          </div>
        </div>
        
        {/* Data de nascimento */}
        <div className="birth-date-area">
          <span className="birth-date-text">
            {formatDate(athlete.birthDate) || 'DATA DE NASCIMENTO AQUI'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;

