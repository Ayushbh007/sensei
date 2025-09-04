<script>
  import { goto } from '$app/navigation';

  let formData = {
    name: '',
    class: '',
    board: '',
    subject: '',
    parentsName: '',
    parentsContact: ''
  };

  let errors = {};
  let isSubmitting = false;
  let isSubmitted = false; // ✅ new state for success screen
  let whatsappLink = "https://chat.whatsapp.com/XXXXXXXXXXX"; // ✅ replace with your actual group link

  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.class.trim()) {
      errors.class = 'Class is required';
    }
    
    if (!formData.board.trim()) {
      errors.board = 'Board is required';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.parentsName.trim()) {
      errors.parentsName = 'Parent\'s name is required';
    }
    
    if (!formData.parentsContact.trim()) {
      errors.parentsContact = 'Parent\'s contact is required';
    } else if (!/^\d{10}$/.test(formData.parentsContact.replace(/\s/g, ''))) {
      errors.parentsContact = 'Please enter a valid 10-digit phone number';
    }
    
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    
    isSubmitting = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('School student registration data:', formData);
      isSubmitted = true; // ✅ show success screen
      
      // Reset form
      formData = {
        name: '',
        class: '',
        board: '',
        subject: '',
        parentsName: '',
        parentsContact: ''
      };
      
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function goBack() {
    goto('/');
  }
</script>

<svelte:head>
  <title>School Student Registration</title>
</svelte:head>

<div class="container">
  <div class="form-wrapper">
    <button class="back-btn" on:click={goBack}>← Back to Home</button>
    
    <div class="form-container">
      {#if !isSubmitted}
        <h1>School Student Registration</h1>
        
        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              class:error={errors.name}
              placeholder="Enter student's full name"
            />
            {#if errors.name}
              <span class="error-text">{errors.name}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="class">Class *</label>
            <input
              id="class"
              type="text"
              bind:value={formData.class}
              class:error={errors.class}
              placeholder="e.g., 10th, 12th"
            />
            {#if errors.class}
              <span class="error-text">{errors.class}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="board">Board *</label>
            <select
              id="board"
              bind:value={formData.board}
              class:error={errors.board}
            >
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="IB">International Baccalaureate (IB)</option>
              <option value="Other">Other</option>
            </select>
            {#if errors.board}
              <span class="error-text">{errors.board}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="subject">Subject *</label>
            <input
              id="subject"
              type="text"
              bind:value={formData.subject}
              class:error={errors.subject}
              placeholder="e.g., Mathematics, Physics, Chemistry"
            />
            {#if errors.subject}
              <span class="error-text">{errors.subject}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="parentsName">Parent's Name *</label>
            <input
              id="parentsName"
              type="text"
              bind:value={formData.parentsName}
              class:error={errors.parentsName}
              placeholder="Enter parent's full name"
            />
            {#if errors.parentsName}
              <span class="error-text">{errors.parentsName}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="parentsContact">Parent's Contact Number *</label>
            <input
              id="parentsContact"
              type="tel"
              bind:value={formData.parentsContact}
              class:error={errors.parentsContact}
              placeholder="Enter 10-digit phone number"
            />
            {#if errors.parentsContact}
              <span class="error-text">{errors.parentsContact}</span>
            {/if}
          </div>

          <button 
            type="submit" 
            class="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      
      {:else}
        <div class="success-container">
          <div class="success-icon">✅</div>
          <h2>Registration Successful!</h2>
          <p class="success-message">
            Thank you for registering. Join our WhatsApp group to stay updated.
          </p>
          
          <div class="whatsapp-section">
            <h3>Join our WhatsApp Group</h3>
            <a href={whatsappLink} target="_blank" class="whatsapp-btn">
              Join WhatsApp Group
            </a>
            <p class="whatsapp-note">
              Click the button above to join. Make sure you have WhatsApp installed.
            </p>
          </div>

          <div class="action-buttons">
            <button class="primary-btn" on:click={() => isSubmitted = false}>
              Register Another Student
            </button>
            <button class="secondary-btn" on:click={goBack}>
              Back to Home
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .form-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e1e1e1;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #667eea;
  }

  input.error, select.error {
    border-color: #e74c3c;
  }

  .error-text {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #45a049, #3d8b40);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 1.5rem;
    }
    
    h1 {
      font-size: 1.5rem;
    }
  }

  /* Success page styles */
  .success-container {
    text-align: center;
    padding: 2rem 0;
  }

  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .success-container h2 {
    color: #4CAF50;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .success-message {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .whatsapp-section {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;
    border: 2px solid #e9ecef;
  }

  .whatsapp-section h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .whatsapp-btn {
    display: inline-block;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: white;
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1rem 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }

  .whatsapp-btn:hover {
    background: linear-gradient(135deg, #128C7E, #075E54);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  }

  .whatsapp-note {
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .action-buttons {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .primary-btn, .secondary-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .primary-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  .primary-btn:hover {
    background: linear-gradient(135deg, #5a6fd8, #6a4190);
    transform: translateY(-1px);
  }

  .secondary-btn {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #e9ecef;
  }

  .secondary-btn:hover {
    background: #e9ecef;
    border-color: #dee2e6;
  }
</style>
