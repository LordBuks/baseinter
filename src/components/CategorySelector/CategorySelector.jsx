import React, { useState } from 'react';
import { ChevronDown, School, Clock } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import './CategorySelector.css';

const CategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useAthletes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mapeamento de categorias para exibir apenas o nome da escola sem o turno
  const categoryMap = {
    'Turno Manhã - Escola São Francisco': {
      displayName: 'Escola São Francisco',
      shortName: 'São Francisco',
      turno: 'Manhã',
      color: '#f59e0b'
    },
    'Turno Manhã - Escola Estadual Padre Léo': {
      displayName: 'Escola Padre Léo',
      shortName: 'Padre Léo',
      turno: 'Manhã',
      color: '#f59e0b'
    },
    'Turno Noite - Escola Estadual de Educação Básica Professor Gentil Viegas Cardoso': {
      displayName: 'Escola Gentil Viegas',
      shortName: 'Gentil Viegas',
      turno: 'Noite',
      color: '#3b82f6'
    },
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': {
      displayName: 'Escola Júlio César',
      shortName: 'Júlio César',
      turno: 'Noite',
      color: '#3b82f6'
    },
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento': {
      displayName: 'Escola Juliano Nascimento',
      shortName: 'Juliano Nascimento',
      turno: 'Noite',
      color: '#3b82f6'
    }
  };

  const categories = [
    'Turno Manhã - Escola São Francisco', 
    'Turno Manhã - Escola Estadual Padre Léo', 
    'Turno Noite - Escola Estadual de Educação Básica Professor Gentil Viegas Cardoso', 
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza', 
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento'
  ];

  // Separar escolas por turno
  const nightSchools = categories.filter(cat => cat.includes('Noite'));
  const morningSchools = categories.filter(cat => cat.includes('Manhã'));

  const getCurrentSchoolInfo = () => {
    return categoryMap[selectedCategory] || { 
      shortName: 'Selecione uma escola', 
      turno: '', 
      color: '#6b7280' 
    };
  };

  const handleSchoolSelect = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <div className="category-selector-compact">
      <div className="school-selector-container">
        
        {/* Botão principal do seletor */}
        <div className="main-selector">
          <button 
            className={`selector-button ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ borderColor: getCurrentSchoolInfo().color }}
          >
            <div className="selector-content">
              <div className="selector-icon" style={{ backgroundColor: getCurrentSchoolInfo().color }}>
                <School size={20} />
              </div>
              <div className="selector-text">
                <span className="school-name-compact">{getCurrentSchoolInfo().shortName}</span>
                {getCurrentSchoolInfo().turno && (
                  <span className="turno-indicator" style={{ color: getCurrentSchoolInfo().color }}>
                    <Clock size={12} />
                    {getCurrentSchoolInfo().turno}
                  </span>
                )}
              </div>
              <ChevronDown 
                size={20} 
                className={`chevron ${isMenuOpen ? 'rotated' : ''}`}
                style={{ color: getCurrentSchoolInfo().color }}
              />
            </div>
          </button>
        </div>

        {/* Menu dropdown */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
            <div className="menu-content">
              
              {/* Seção Turno Noite */}
              <div className="menu-section">
                <div className="section-header-compact">
                  <Clock size={16} />
                  <span>Turno Noite</span>
                </div>
                <div className="school-list">
                  {nightSchools.map((category) => (
                    <button
                      key={category}
                      className={`school-option ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => handleSchoolSelect(category)}
                      title={categoryMap[category].displayName}
                    >
                      <div className="option-indicator night" />
                      <span>{categoryMap[category].shortName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divisor */}
              <div className="menu-divider">
                <div className="divider-line" />
                <div className="inter-mini-icon">SC</div>
                <div className="divider-line" />
              </div>

              {/* Seção Turno Manhã */}
              <div className="menu-section">
                <div className="section-header-compact">
                  <Clock size={16} />
                  <span>Turno Manhã</span>
                </div>
                <div className="school-list">
                  {morningSchools.map((category) => (
                    <button
                      key={category}
                      className={`school-option ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => handleSchoolSelect(category)}
                      title={categoryMap[category].displayName}
                    >
                      <div className="option-indicator morning" />
                      <span>{categoryMap[category].shortName}</span>
                    </button>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default CategorySelector;

