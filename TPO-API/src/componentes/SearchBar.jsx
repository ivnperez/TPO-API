import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import '../css/Auth.css'; // Importando desde la carpeta css

const searchbar = () => {
  const [form, setForm] = useState({
    palabra: ''
  });
  const dispatch = useDispatch();
  //const { status, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchbar(form));
  };

  return (
    <div className="searchbar-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label>Buscar:</label>
          <input type="text" name="search" value={form.palabra} onChange={handleChange} required />
        </div>
        {status === 'failed' && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default searchbar;
