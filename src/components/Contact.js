import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return React.createElement('section', {
    id: 'contact',
    style: {
      padding: '5rem 0',
      backgroundColor: '#1E293B'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '0 1rem'
    }
  }, [
    React.createElement('h2', {
      key: 'title',
      style: {
        fontSize: '1.875rem',
        fontWeight: '700',
        color: '#F8FAFC',
        marginBottom: '2rem',
        textAlign: 'center'
      }
    }, "Get In Touch"),

    submitStatus === 'success' ? React.createElement('div', {
      key: 'success',
      style: {
        padding: '1rem',
        backgroundColor: '#10B981',
        color: 'white',
        borderRadius: '0.375rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }
    }, "Message sent successfully! I'll get back to you soon.") : null,

    submitStatus === 'error' ? React.createElement('div', {
      key: 'error',
      style: {
        padding: '1rem',
        backgroundColor: '#EF4444',
        color: 'white',
        borderRadius: '0.375rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }
    }, "Failed to send message. Please try again later.") : null,

    React.createElement('form', {
      key: 'form',
      onSubmit: handleSubmit,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }
    }, [
      createFormField({
        label: 'Name',
        name: 'name',
        type: 'text',
        value: formData.name,
        error: errors.name,
        onChange: handleChange
      }),

      createFormField({
        label: 'Email',
        name: 'email',
        type: 'email',
        value: formData.email,
        error: errors.email,
        onChange: handleChange
      }),

      createFormField({
        label: 'Message',
        name: 'message',
        type: 'textarea',
        value: formData.message,
        error: errors.message,
        onChange: handleChange
      }),

      React.createElement('button', {
        key: 'submit',
        type: 'submit',
        disabled: isSubmitting,
        style: {
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3B82F6',
          color: 'white',
          fontWeight: '600',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          border: 'none',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: '#2563EB'
          },
          ':disabled': {
            backgroundColor: '#9CA3AF',
            cursor: 'not-allowed'
          }
        }
      }, isSubmitting ? 'Sending...' : 'Send Message')
    ])
  ]));
}

// Helper function to create form fields
function createFormField({ label, name, type, value, error, onChange }) {
  return React.createElement('div', {
    key: name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, [
    React.createElement('label', {
      key: 'label',
      htmlFor: name,
      style: {
        color: '#F8FAFC',
        fontSize: '0.875rem',
        fontWeight: '500'
      }
    }, label),

    type === 'textarea' ? React.createElement('textarea', {
      key: 'input',
      id: name,
      name: name,
      value: value,
      onChange: onChange,
      style: {
        padding: '0.75rem',
        backgroundColor: '#0F172A',
        border: `1px solid ${error ? '#EF4444' : '#334155'}`,
        borderRadius: '0.375rem',
        color: '#F8FAFC',
        minHeight: '120px',
        resize: 'vertical',
        ':focus': {
          outline: 'none',
          borderColor: '#3B82F6',
          boxShadow: '0 0 0 1px #3B82F6'
        }
      }
    }) : React.createElement('input', {
      key: 'input',
      id: name,
      name: name,
      type: type,
      value: value,
      onChange: onChange,
      style: {
        padding: '0.75rem',
        backgroundColor: '#0F172A',
        border: `1px solid ${error ? '#EF4444' : '#334155'}`,
        borderRadius: '0.375rem',
        color: '#F8FAFC',
        ':focus': {
          outline: 'none',
          borderColor: '#3B82F6',
          boxShadow: '0 0 0 1px #3B82F6'
        }
      }
    }),

    error && React.createElement('p', {
      key: 'error',
      style: {
        color: '#EF4444',
        fontSize: '0.75rem',
        marginTop: '0.25rem'
      }
    }, error)
  ]);
}