<script>
  import { goto } from '$app/navigation';

  function handleSchoolRegistration() {
    console.log('Navigating to school registration...');
    goto('/register/school');
  }

  function handleCollegeRegistration() {
    console.log('Navigating to college registration...');
    goto('/register/college');
  }
</script>

<div class="container">
  <div class="button-group">
    <h1>Choose Your Registration Type</h1>
    <button 
      class="registration-btn school-btn" 
      on:click={handleSchoolRegistration}
    >
      Register as School Student
    </button>
    
    <button 
      class="registration-btn college-btn" 
      on:click={handleCollegeRegistration}
    >
      Register as College Student
    </button>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .button-group {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 90%;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .registration-btn {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    margin: 1rem 0;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: none;
  }

  .school-btn {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
  }

  .school-btn:hover {
    background: linear-gradient(135deg, #45a049, #3d8b40);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }

  .college-btn {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    color: white;
  }

  .college-btn:hover {
    background: linear-gradient(135deg, #1976D2, #1565C0);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  }

  .registration-btn:active {
    transform: translateY(0);
  }
</style>