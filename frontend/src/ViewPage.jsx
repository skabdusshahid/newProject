import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPage = () => {
  const [forms, setForms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/form');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/form/${id}`);
      fetchForms();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (form) => {
    setEditing(form._id);
    setFormData({ name: form.name, email: form.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/form/${editing}`, formData);
      setEditing(null);
      setFormData({ name: '', email: '' });
      fetchForms();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>View Forms</h1>
      <ul style={styles.list}>
        {forms.map((form) => (
          <li key={form._id} style={styles.listItem}>
            {editing === form._id ? (
              <form onSubmit={handleUpdate} style={styles.form}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>Update</button>
                <button type="button" onClick={() => setEditing(null)} style={styles.button}>Cancel</button>
              </form>
            ) : (
              <div>
                <p style={styles.text}>Name: {form.name}</p>
                <p style={styles.text}>Email: {form.email}</p>
                <button  onClick={() => handleEdit(form)} style={{...styles.button, backgroundColor: 'green'}}>Edit</button>
                <button onClick={() => handleDelete(form._id)} style={{...styles.button, backgroundColor: 'red'}}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px',
  },
  text: {
    margin: '0',
  },
};

export default ViewPage;
