import React, { createContext, useContext, useState, useEffect } from 'react';

const AthleteContext = createContext();

export const useAthletes = () => {
  const context = useContext(AthleteContext);
  if (!context) {
    throw new Error('useAthletes must be used within an AthleteProvider');
  }
  return context;
};

export const AthleteProvider = ({ children }) => {
  const [athletes, setAthletes] = useState(() => {
    const defaultAthletesState = {
      'Turno Manhã - Escola São Francisco': [],
      'Turno Manhã - Escola Estadual Padre Léo': [],
      'Turno Noite - Escola Estadual de Educação Básica Professor Gentil Viegas Cardoso': [],
      'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': [],
      'Turno Noite - E.M.E.F. Professor Juliano Nascimento': []
    };

    const savedAthletes = localStorage.getItem('internacional-athletes');
    if (savedAthletes) {
      try {
        const parsedAthletes = JSON.parse(savedAthletes);
        const initialState = { ...defaultAthletesState };
        for (const category in parsedAthletes) {
          if (Array.isArray(parsedAthletes[category])) {
            initialState[category] = parsedAthletes[category];
          } else {
            console.warn(`AthleteContext: Categoria '${category}' no localStorage não é um array. Ignorando.`);
          }
        }
        return initialState;
      } catch (e) {
        console.error('AthleteContext: Erro ao parsear localStorage:', e);
        localStorage.removeItem('internacional-athletes'); // Limpa dados corrompidos
        return defaultAthletesState;
      }
    }
    return defaultAthletesState;
  });
  
  const [selectedCategory, setSelectedCategory] = useState('Turno Manhã - Escola São Francisco');

  useEffect(() => {
    localStorage.setItem('internacional-athletes', JSON.stringify(athletes));
  }, [athletes]);

  const addAthlete = (category, athlete) => {
    console.log('AthleteContext: [addAthlete] Recebido - Categoria:', category, 'Atleta:', athlete); // Novo log
    setAthletes(prev => {
      console.log('AthleteContext: [addAthlete] Estado anterior (prev):', prev); // Novo log
      console.log('AthleteContext: [addAthlete] prev[category]:', prev[category]); // Novo log
      const currentCategoryAthletes = Array.isArray(prev[category]) ? prev[category] : [];
      const newState = {
        ...prev,
        [category]: [...currentCategoryAthletes, athlete]
      };
      console.log('AthleteContext: [addAthlete] Novo estado:', newState); // Novo log
      return newState;
    });
  };

  const updateAthlete = (updatedAthlete) => {
    setAthletes(prev => {
      const newState = { ...prev };
      for (const category in newState) {
        const athleteIndex = newState[category].findIndex(athlete => athlete.id === updatedAthlete.id);
        if (athleteIndex !== -1) {
          newState[category][athleteIndex] = updatedAthlete;
          break;
        }
      }
      return newState;
    });
  };

  const deleteAthlete = (athleteId) => {
    setAthletes(prev => {
      const newState = { ...prev };
      for (const category in newState) {
        newState[category] = newState[category].filter(athlete => athlete.id !== athleteId);
      }
      return newState;
    });
  };

  const getAthletesByCategory = (category) => {
    return athletes[category] || [];
  };

  const value = {
    athletes,
    selectedCategory,
    setSelectedCategory,
    addAthlete,
    updateAthlete,
    deleteAthlete,
    getAthletesByCategory
  };

  return (
    <AthleteContext.Provider value={value}>
      {children}
    </AthleteContext.Provider>
  );
};


