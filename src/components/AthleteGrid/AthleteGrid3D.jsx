import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import AthleteCard3D from '../AthleteCard/AthleteCard3D';
import AddAthleteModal from '../AddAthleteModal/AddAthleteModal';
import AthleteDetailsPage from '../AthleteDetailsPage/AthleteDetailsPage';
import './AthleteGrid3D.css';

const AthleteGrid3D = () => {
  const { selectedCategory, getAthletesByCategory, deleteAthlete, updateAthlete } = useAthletes();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  
  const athletes = getAthletesByCategory(selectedCategory).sort((a, b) => {
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Mapeamento de categorias para exibir apenas o nome da escola sem o turno
  const categoryMap = {
    'Turno Manhã - Escola São Francisco': {
      displayName: 'Escola São Francisco',
      turno: 'Manhã'
    },
    'Turno Manhã - Escola Estadual Padre Léo': {
      displayName: 'Escola Estadual Padre Léo',
      turno: 'Manhã'
    },
    'Turno Noite - Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso': {
      displayName: 'Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso',
      turno: 'Noite'
    },
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': {
      displayName: 'Escola Estadual de Educação Básica Júlio César Ribeiro de Souza',
      turno: 'Noite'
    },
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento': {
      displayName: 'E.M.E.F. Professor Juliano Nascimento',
      turno: 'Noite'
    }
  };

  const handleCardClick = (athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleCloseDetailsPage = () => {
    setSelectedAthlete(null);
  };

  const handleDeleteAthlete = (athleteId) => {
    deleteAthlete(athleteId);
  };

  const handleUpdateAthlete = (updatedAthlete) => {
    updateAthlete(updatedAthlete);
  };

  return (
    <div className="athlete-grid-container-3d">
      <div className="grid-header-3d">
        <div className="category-header">
          <h2 className="category-title-3d">{categoryMap[selectedCategory].displayName}</h2>
          <span className="category-turno-badge">{categoryMap[selectedCategory].turno}</span>
        </div>
        <p className="athletes-count-3d">
          {athletes.length} {athletes.length === 1 ? 'atleta' : 'atletas'} cadastrado{athletes.length === 1 ? '' : 's'}
        </p>
      </div>
      
      <div className="athlete-grid-3d">
        {athletes.map((athlete, index) => (
          <div 
            key={athlete.id} 
            className="athlete-card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AthleteCard3D 
              athlete={athlete} 
              onCardClick={handleCardClick}
              onDeleteAthlete={handleDeleteAthlete}
            />
          </div>
        ))}
        
        <div 
          className="add-athlete-card-3d"
          onClick={() => setShowAddModal(true)}
          style={{ animationDelay: `${athletes.length * 0.1}s` }}
        >
          <div className="add-card-inner">
            <div className="add-card-background">
              <div className="add-geometric-pattern"></div>
            </div>
            <div className="add-card-content">
              <div className="add-icon-container">
                <Plus size={48} />
              </div>
              <h3 className="add-card-title">Adicionar Atleta</h3>
              <p className="add-card-subtitle">
                Clique para cadastrar um novo atleta na categoria {categoryMap[selectedCategory].displayName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddAthleteModal 
          category={selectedCategory}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {selectedAthlete && (
        <AthleteDetailsPage 
          athlete={selectedAthlete}
          onClose={handleCloseDetailsPage}
          onDeleteAthlete={handleDeleteAthlete}
          onUpdateAthlete={handleUpdateAthlete}
        />
      )}
    </div>
  );
};

export default AthleteGrid3D;

