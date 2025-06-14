import React, { useState } from 'react';
import { X, Edit, Trash2, User, Calendar, MapPin, GraduationCap, School, ArrowLeft, Save, Edit3 } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import './AthleteDetailsModal.css';

const AthleteDetailsModal = ({ athlete, category, onClose }) => {
  const { updateAthlete, deleteAthlete } = useAthletes();
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editData, setEditData] = useState({
    ...athlete,
    evaluation: athlete.evaluation || { comportamento: 5, compromisso: 5, escola: 5 },
    observations: athlete.observations || '',
    schoolProgress: athlete.schoolProgress || '',
    improvementPoints: athlete.improvementPoints || ''
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getOverallRating = (evaluation = athlete.evaluation) => {
    if (!evaluation) return 5;
    const { comportamento = 5, compromisso = 5, escola = 5 } = evaluation;
    return Math.round((comportamento + compromisso + escola) / 3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEvaluationChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [field]: parseInt(value)
      }
    }));
  };

  const handleSave = () => {
    updateAthlete(editData);
    setIsEditing(false);
    setEditingField(null);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este atleta?')) {
      deleteAthlete(athlete.id);
      onClose();
    }
  };

  const handleFieldEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleFieldSave = (fieldName) => {
    updateAthlete(editData);
    setEditingField(null);
  };

  const handleFieldCancel = () => {
    setEditData({
      ...athlete,
      evaluation: athlete.evaluation || { comportamento: 5, compromisso: 5, escola: 5 },
      observations: athlete.observations || '',
      schoolProgress: athlete.schoolProgress || '',
      improvementPoints: athlete.improvementPoints || ''
    });
    setEditingField(null);
  };

  const positions = [
    'Goleiro', 'Lateral Direito', 'Lateral Esquerdo', 'Zagueiro',
    'Volante', 'Meio-campo', 'Meia-atacante', 'Ponta Direita',
    'Ponta Esquerda', 'Centroavante'
  ];

  const schoolYears = [
    '6º Ano EF', '7º Ano EF', '8º Ano EF', '9º Ano EF',
    '1º Ano EM', '2º Ano EM', '3º Ano EM'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="details-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <div className="athlete-header-info">
            <div className="athlete-photo-large">
              {athlete.photo ? (
                <img src={athlete.photo} alt={athlete.name} />
              ) : (
                <User size={60} />
              )}
            </div>
            <div className="athlete-title-info">
              <h2 className="athlete-name-large">{athlete.name || 'Nome não informado'}</h2>
              <p className="athlete-category">{category}</p>
              <div className="overall-rating">
                <span className="rating-label">Avaliação Geral:</span>
                <span className="rating-value">{getOverallRating()}/10</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="back-btn btn-elegant-back" onClick={onClose}>
              <ArrowLeft size={16} />
              Voltar
            </button>
            
            <button className="edit-btn btn-elegant-green" onClick={() => setIsEditing(true)}>
              <Edit size={16} />
              Editar
            </button>
            
            <button className="delete-btn btn-elegant-yellow" onClick={handleDelete}>
              <Trash2 size={16} />
              Deletar
            </button>
            
            <button className="close-button" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="details-body">
          <div className="details-grid">
            <div className="details-section">
              <h3 className="section-title">
                <User size={20} />
                Informações Pessoais
              </h3>
              
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{athlete.fullName || 'Não informado'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Data de Nascimento</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthDate"
                      value={editData.birthDate || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{formatDate(athlete.birthDate)}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Naturalidade</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="naturalidade"
                      value={editData.naturalidade || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{athlete.naturalidade || 'Não informado'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Posição</label>
                  {isEditing ? (
                    <select
                      name="position"
                      value={editData.position || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione uma posição</option>
                      {positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{athlete.position || 'Não informado'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3 className="section-title">
                <School size={20} />
                Informações Acadêmicas
              </h3>
              
              <div className="info-grid">
                <div className="info-item">
                  <label>Ano Escolar</label>
                  {isEditing ? (
                    <select
                      name="schoolYear"
                      value={editData.schoolYear || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione o ano</option>
                      {schoolYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{athlete.schoolYear || 'Não informado'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Admissão no Alojamento</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="admissionDate"
                      value={editData.admissionDate || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{formatDate(athlete.admissionDate)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="additional-info-section">
            {/* Observações sobre o atleta */}
            <div className="info-card-editable">
              <div className="info-card-header">
                <h4>Observações sobre o atleta</h4>
                <div className="card-actions">
                  {editingField === 'observations' ? (
                    <>
                      <button 
                        className="save-field-btn"
                        onClick={() => handleFieldSave('observations')}
                      >
                        <Save size={14} />
                      </button>
                      <button 
                        className="cancel-field-btn"
                        onClick={handleFieldCancel}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button 
                      className="edit-field-btn"
                      onClick={() => handleFieldEdit('observations')}
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="info-card-content">
                {editingField === 'observations' ? (
                  <textarea
                    name="observations"
                    value={editData.observations}
                    onChange={handleInputChange}
                    placeholder="Observações sobre o atleta..."
                    rows={4}
                    autoFocus
                  />
                ) : (
                  <p>{athlete.observations || 'Nenhuma observação registrada'}</p>
                )}
              </div>
            </div>

            {/* Andamento escolar */}
            <div className="info-card-editable">
              <div className="info-card-header">
                <h4>Andamento escolar</h4>
                <div className="card-actions">
                  {editingField === 'schoolProgress' ? (
                    <>
                      <button 
                        className="save-field-btn"
                        onClick={() => handleFieldSave('schoolProgress')}
                      >
                        <Save size={14} />
                      </button>
                      <button 
                        className="cancel-field-btn"
                        onClick={handleFieldCancel}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button 
                      className="edit-field-btn"
                      onClick={() => handleFieldEdit('schoolProgress')}
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="info-card-content">
                {editingField === 'schoolProgress' ? (
                  <textarea
                    name="schoolProgress"
                    value={editData.schoolProgress}
                    onChange={handleInputChange}
                    placeholder="Informações sobre o andamento escolar..."
                    rows={4}
                    autoFocus
                  />
                ) : (
                  <p>{athlete.schoolProgress || 'Nenhuma informação sobre andamento escolar'}</p>
                )}
              </div>
            </div>

            {/* Pontos a reforçar */}
            <div className="info-card-editable">
              <div className="info-card-header">
                <h4>Pontos a reforçar</h4>
                <div className="card-actions">
                  {editingField === 'improvementPoints' ? (
                    <>
                      <button 
                        className="save-field-btn"
                        onClick={() => handleFieldSave('improvementPoints')}
                      >
                        <Save size={14} />
                      </button>
                      <button 
                        className="cancel-field-btn"
                        onClick={handleFieldCancel}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button 
                      className="edit-field-btn"
                      onClick={() => handleFieldEdit('improvementPoints')}
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="info-card-content">
                {editingField === 'improvementPoints' ? (
                  <textarea
                    name="improvementPoints"
                    value={editData.improvementPoints}
                    onChange={handleInputChange}
                    placeholder="Pontos que precisam ser reforçados..."
                    rows={4}
                    autoFocus
                  />
                ) : (
                  <p>{athlete.improvementPoints || 'Nenhum ponto específico a reforçar'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="evaluation-section-details">
            <h3 className="section-title">
              <GraduationCap size={20} />
              Avaliação do Atleta
            </h3>
            
            <div className="evaluation-grid">
              <div className="evaluation-item-details">
                <label>Comportamento: {isEditing ? editData.evaluation.comportamento : athlete.evaluation?.comportamento || 5}/10</label>
                {isEditing ? (
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={editData.evaluation.comportamento}
                    onChange={(e) => handleEvaluationChange('comportamento', e.target.value)}
                    className="evaluation-slider"
                  />
                ) : (
                  <div className="evaluation-bar">
                    <div 
                      className="evaluation-fill"
                      style={{ width: `${(athlete.evaluation?.comportamento || 5) * 10}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="evaluation-item-details">
                <label>Compromisso: {isEditing ? editData.evaluation.compromisso : athlete.evaluation?.compromisso || 5}/10</label>
                {isEditing ? (
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={editData.evaluation.compromisso}
                    onChange={(e) => handleEvaluationChange('compromisso', e.target.value)}
                    className="evaluation-slider"
                  />
                ) : (
                  <div className="evaluation-bar">
                    <div 
                      className="evaluation-fill"
                      style={{ width: `${(athlete.evaluation?.compromisso || 5) * 10}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="evaluation-item-details">
                <label>Escola: {isEditing ? editData.evaluation.escola : athlete.evaluation?.escola || 5}/10</label>
                {isEditing ? (
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={editData.evaluation.escola}
                    onChange={(e) => handleEvaluationChange('escola', e.target.value)}
                    className="evaluation-slider"
                  />
                ) : (
                  <div className="evaluation-bar">
                    <div 
                      className="evaluation-fill"
                      style={{ width: `${(athlete.evaluation?.escola || 5) * 10}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
              <button className="save-btn btn-elegant-save" onClick={handleSave}>
                Salvar Alterações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteDetailsModal;

