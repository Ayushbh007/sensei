<script>
  export let name;
  export let qualification;
  export let experience;
</script>

<!-- inline style uses the CSS variable; if it's missing, fallback to #f4f6f9 -->
<div class="card" style="background-color: var(--panel-bg, #f4f6f9);">
  <h2>{name}</h2>
  <p><strong>Qualification:</strong> {qualification}</p>
  {#if experience}
    <p><strong>Experience:</strong> {experience}</p>
  {/if}
</div>

<style>
  .card {
    /* NO white backgrounds anywhere */
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 12px;
    padding: 1.2rem;
    text-align: left;

    /* keep it subtle so it blends with the section */
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.08);
  }

  h2 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #111;
  }

  p {
    color: #333;
    margin: 0.3rem 0;
  }
</style>
