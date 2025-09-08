<script>
  import { initEmailJS, emailjs } from '$lib/email';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let formData = {
    name: '',
    semester: '',
    year: '',
    course: '',
    college: '',
    activeBacklogs: '',
    contactNo: ''
  };

  let errors = {};
  let isSubmitting = false;
  let isSubmitted = false;
  let showConfirmationModal = false;
  let confirmationData = {};
  let whatsappLink = "https://chat.whatsapp.com/XXXXXXXXXXX";

  onMount(() => {
    initEmailJS();
  });

  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.semester.trim()) {
      errors.semester = 'Semester is required';
    }
    
    if (!formData.year.trim()) {
      errors.year = 'Year is required';
    }
    
    if (!formData.course.trim()) {
      errors.course = 'Course is required';
    }
    
    if (!formData.college.trim()) {
      errors.college = 'College name is required';
    }
    
    if (!formData.activeBacklogs.trim()) {
      errors.activeBacklogs = 'Active backlogs field is required';
    }
    
    if (!formData.contactNo.trim()) {
      errors.contactNo = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNo.replace(/\s/g, ''))) {
      errors.contactNo = 'Please enter a valid 10-digit phone number';
    }
    
    return Object.keys(errors).length === 0;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    // Collect form data for confirmation
    confirmationData = {
      name: formData.name,
      semester: formData.semester,
      year: formData.year,
      course: formData.course,
      college: formData.college,
      activeBacklogs: formData.activeBacklogs,
      contactNo: formData.contactNo
    };
    
    // Show confirmation modal
    showConfirmationModal = true;
  }

  async function sendEmail() {
    try {
      isSubmitting = true;
      console.log('Starting email send process...');
      
      const templateParams = {
        name: formData.name,
        semester: formData.semester,
        year: formData.year,
        course: formData.course,
        college: formData.college,
        activeBacklogs: formData.activeBacklogs || '0',
        contactNo: formData.contactNo,
        message_date: new Date().toLocaleDateString(),
        reply_to: formData.contactNo
      };

      console.log('Template params:', templateParams);
      
      // Direct EmailJS call without our wrapper
      const response = await emailjs.send(
        'service_abc123',
        'college_registration',
        templateParams,
        'xil_Yf0d6m5EfRPRv'
      );
      
      console.log('Email sent successfully:', response);
      isSubmitted = true;
      showConfirmationModal = false;
      showSuccessScreen();
      
    } catch (error) {
      console.error('Failed to send college registration email. Error details:', error);
      alert('Registration failed. Please try again later.');
      showConfirmationModal = false;
      isSubmitting = false;
    } finally {
      isSubmitting = false;
    }
  }

  async function confirmSubmission() {
    try {
      showConfirmationModal = false;
      await sendEmail();
    } catch (error) {
      console.error('Submission failed:', error);
      isSubmitting = false;
      showConfirmationModal = false;
    }
  }

  function closeConfirmationModal() {
    showConfirmationModal = false;
  }

  function showSuccessScreen() {
    isSubmitted = true;
    isSubmitting = false;
    
    // Reset form
    formData = {
      name: '',
      semester: '',
      year: '',
      course: '',
      college: '',
      activeBacklogs: '',
      contactNo: ''
    };
  }

  function goBack() {
    goto('/');
  }
</script>

<svelte:head>
  <title>College Student Registration</title>
</svelte:head>

<div class="container">
  <div class="form-wrapper">
    <button class="back-btn" on:click={goBack}>← Back to Home</button>
    
    <div class="form-container">
      {#if !isSubmitted}
        <h1>College Student Registration</h1>
        
        <form id="college_registration" on:submit={handleFormSubmit}>
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              bind:value={formData.name}
              class:error={errors.name}
              placeholder="Enter student's full name"
            />
            {#if errors.name}
              <span class="error-text">{errors.name}</span>
            {/if}
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="semester">Semester *</label>
              <select
                id="semester"
                name="semester"
                bind:value={formData.semester}
                class:error={errors.semester}
              >
                <option value="">Select Semester</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
              {#if errors.semester}
                <span class="error-text">{errors.semester}</span>
              {/if}
            </div>

            <div class="form-group">
              <label for="year">Year *</label>
              <select
                id="year"
                name="year"
                bind:value={formData.year}
                class:error={errors.year}
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
              {#if errors.year}
                <span class="error-text">{errors.year}</span>
              {/if}
            </div>
          </div>

          <div class="form-group">
            <label for="course">Course *</label>
            <input
              id="course"
              name="course"
              type="text"
              bind:value={formData.course}
              class:error={errors.course}
              placeholder="e.g., B.Tech Computer Science, MBA, B.Com"
            />
            {#if errors.course}
              <span class="error-text">{errors.course}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="college">College *</label>
            <input
              id="college"
              name="college"
              type="text"
              bind:value={formData.college}
              class:error={errors.college}
              placeholder="Enter college/university name"
            />
            {#if errors.college}
              <span class="error-text">{errors.college}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="activeBacklogs">Active Backlogs *</label>
            <select
              id="activeBacklogs"
              name="activeBacklogs"
              bind:value={formData.activeBacklogs}
              class:error={errors.activeBacklogs}
            >
              <option value="">Select Active Backlogs</option>
              <option value="No Backlogs">No Backlogs</option>
              <option value="1 Backlog">1 Backlog</option>
              <option value="2 Backlogs">2 Backlogs</option>
              <option value="3 Backlogs">3 Backlogs</option>
              <option value="4 Backlogs">4 Backlogs</option>
              <option value="5+ Backlogs">5+ Backlogs</option>
            </select>
            {#if errors.activeBacklogs}
              <span class="error-text">{errors.activeBacklogs}</span>
            {/if}
          </div>

          <div class="form-group">
            <label for="contactNo">Contact Number *</label>
            <input
              id="contactNo"
              name="contactNo"
              type="tel"
              bind:value={formData.contactNo}
              class:error={errors.contactNo}
              placeholder="Enter 10-digit phone number"
            />
            {#if errors.contactNo}
              <span class="error-text">{errors.contactNo}</span>
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
            Thank you for registering. Your registration details have been sent via email. Join our WhatsApp group to stay updated.
          </p>
          
          <div class="whatsapp-section">
            <h3>Join our WhatsApp Group</h3>
            <a href={"https://chat.whatsapp.com/CYVRwdONRZ0Grg1auRKe7C?mode=ems_wa_t"} target="_blank" class="whatsapp-btn">
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

<!-- Confirmation Modal -->
{#if showConfirmationModal}
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <svg xmlns="http://www.w3.org/2000/svg" class="modal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3>Confirm Registration</h3>
      </div>
      
      <p class="modal-description">Please review the registration details before submitting:</p>
      
      <div class="confirmation-details">
        <div class="detail-item">
          <strong>Name:</strong> {confirmationData.name}
        </div>
        <div class="detail-item">
          <strong>Semester:</strong> {confirmationData.semester}
        </div>
        <div class="detail-item">
          <strong>Year:</strong> {confirmationData.year}
        </div>
        <div class="detail-item">
          <strong>Course:</strong> {confirmationData.course}
        </div>
        <div class="detail-item">
          <strong>College:</strong> {confirmationData.college}
        </div>
        <div class="detail-item">
          <strong>Active Backlogs:</strong> {confirmationData.activeBacklogs}
        </div>
        <div class="detail-item">
          <strong>Contact Number:</strong> {confirmationData.contactNo}
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="cancel-btn" on:click={closeConfirmationModal}>
          Cancel
        </button>
        <button class="confirm-btn" on:click={confirmSubmission} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    min-height: 100vh;
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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
    border-color: #2196F3;
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
    background: linear-gradient(135deg, #2196F3, #1976D2);
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
    background: linear-gradient(135deg, #1976D2, #1565C0);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .modal-icon {
    height: 1.5rem;
    width: 1.5rem;
    color: #2196F3;
    margin-right: 0.5rem;
  }

  .modal-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .modal-description {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .confirmation-details {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .detail-item {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }

  .detail-item:last-child {
    margin-bottom: 0;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .cancel-btn, .confirm-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .cancel-btn {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #e9ecef;
  }

  .cancel-btn:hover {
    background: #e9ecef;
    border-color: #dee2e6;
  }

  .confirm-btn {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    color: white;
  }

  .confirm-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #1976D2, #1565C0);
    transform: translateY(-1px);
  }

  .confirm-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
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
    color: #2196F3;
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
    background: linear-gradient(135deg, #2196F3, #1976D2);
    color: white;
  }

  .primary-btn:hover {
    background: linear-gradient(135deg, #1976D2, #1565C0);
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

  @media (max-width: 768px) {
    .form-container {
      padding: 1.5rem;
    }
    
    h1 {
      font-size: 1.5rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .modal-content {
      margin: 1rem;
      padding: 1.5rem;
    }

    .modal-actions {
      flex-direction: column;
    }

    .cancel-btn, .confirm-btn {
      width: 100%;
    }
  }
</style>