<script>
  import Card from '../components/Card.svelte';
  import { goto } from '$app/navigation';

  let showSplash = true;

  // Hide splash after 1.5 sec
  setTimeout(() => {
    showSplash = false;
  }, 1500);

  // Teacher details
  const teachers = [
    {
      name: "Arman Joshi",
      qualification: "Bachelor of Technology (B.Tech, 3rd Year)",
      experience: ""
    },
    {
      name: "Ujjwal Tiwari",
      qualification: "Bachelor of Commerce (Hons), Specialized in Business and Economics",
      experience: ""
    },
    {
      name: "Tushar Aggarwal",
      qualification: "Master of Science in Chemistry",
      experience: "2 years"
    }
  ];

  // Navigation handlers
  async function handleSchoolRegistration() {
    try {
      await goto('/register/school');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

  async function handleCollegeRegistration() {
    try {
      await goto('/register/college');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
</script>

{#if showSplash}
  <!-- Splash screen -->
  <div class="splash">
    <img src="/logo/logo1.jpg" alt="Logo" />
  </div>
{:else}
  <!-- Main content -->
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

  <!-- Teachers section -->
  <div class="main">
    <h1>Meet Our Teachers</h1>
    <div class="cards-section">
      {#each teachers as teacher}
        <Card 
          name={teacher.name} 
          qualification={teacher.qualification} 
          experience={teacher.experience} 
        />
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Splash screen */
  .splash {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: white;
  }

  .splash img {
    max-width: 250px;
    height: auto;
  }

  /* Registration container */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
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

  /* Teachers section */
  .main {
    /* set the section background AND expose it as a variable for children */
    --panel-bg: #f4f6f9;        /* 👈 define once */
    background: var(--panel-bg);
    padding: 2rem;
  }

  .main h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #111;
  }

  .cards-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }
</style>
