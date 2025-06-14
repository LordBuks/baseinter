import React, { useState } from 'react';
import { X, Upload, User, Trophy } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import './AddAthleteModal.css';

const AddAthleteModal = ({ category, onClose }) => {
  const { addAthlete } = useAthletes();
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    name: '',
    fullName: '',
    birthDate: '',
    birthPlace: '',
    position: '',
    photo: null,
    school: '',
    schoolYear: '',
    observations: '',
    schoolProgress: '',
    improvementPoints: '',
    behavior: 3,
    commitment: 3,
    schoolRating: 3,
    category: category
  });

  const [errors, setErrors] = useState({});

  const positions = [
    'Goleiro',
    'Lateral Direito',
    'Lateral Esquerdo',
    'Zagueiro',
    'Volante',
    'Meio-campo',
    'Meia-atacante',
    'Ponta Direita',
    'Ponta Esquerda',
    'Centroavante'
  ];

  const schoolYears = [
    '6º Ano EF',
    '7º Ano EF',
    '8º Ano EF',
    '9º Ano EF',
    '1º Ano EM',
    '2º Ano EM',
    '3º Ano EM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    }
    
    if (!formData.position) {
      newErrors.position = 'Posição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('AddAthleteModal: [handleSubmit] Dados do formulário:', formData);
      console.log('AddAthleteModal: [handleSubmit] Categoria:', category);
      addAthlete(category, formData);
      onClose();
    }
  };

  const renderTrophyRating = (value, onChange, label) => {
    return (
      <div className="trophy-rating">
        <label className="rating-label">{label}</label>
        <div className="trophy-container">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`trophy-button ${value >= rating ? 'active' : ''}`}
              onClick={() => onChange(rating)}
            >
              <Trophy size={16} />
            </button>
          ))}
          <span className="rating-value">{value}/5</span>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Adicionar Atleta</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="athlete-form">
          <div className="form-grid">
            <div className="form-left">
              <div className="photo-section">
                <div className="photo-container">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="photo-preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <User size={40} />
                    </div>
                  )}
                </div>
                <label className="photo-upload-btn btn-3d">
                  <Upload size={16} />
                  Adicionar Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Nome do atleta"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nome completo do atleta"
                />
              </div>

              <div className="form-group">
                <label>Data de Nascimento *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={errors.birthDate ? 'error' : ''}
                />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
              </div>

              <div className="form-group">
                <label>Local de Nascimento</label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  placeholder="Cidade/Estado de nascimento"
                />
              </div>

              <div className="form-group">
                <label>Posição *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={errors.position ? 'error' : ''}
                >
                  <option value="">Selecione uma posição</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>
            </div>

            <div className="form-right">
              {/* Campo removido conforme solicitado */}

              <div className="form-group">
                <label>Ano que Estuda</label>
                <select
                  name="schoolYear"
                  value={formData.schoolYear}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o ano</option>
                  {schoolYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Campos removidos conforme solicitado - aparecerão apenas na página de detalhes/edição */}

              <div className="evaluation-section">
                <h3>Avaliação Inicial</h3>
                
                {renderTrophyRating(
                  formData.behavior,
                  (value) => handleRatingChange('behavior', value),
                  'Comportamento'
                )}

                {renderTrophyRating(
                  formData.commitment,
                  (value) => handleRatingChange('commitment', value),
                  'Compromisso'
                )}

                {renderTrophyRating(
                  formData.schoolRating,
                  (value) => handleRatingChange('schoolRating', value),
                  'Escola'
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-btn btn-3d">
              Adicionar Atleta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAthleteModal;

