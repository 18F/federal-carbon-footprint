<script lang="ts">
  import closeSvg from '../../node_modules/uswds/src/img/usa-icons/close.svg';
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  let isOpen = false;
  const toggleOpen = () => {
    isOpen = !isOpen;
  };
  $: visible = isOpen ? 'is-visible' : '';
</script>

<div
  on:click|preventDefault={() => (isOpen ? toggleOpen() : '')}
  class="usa-overlay {visible}" />

<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo" id="basic-logo">
        <em class="usa-logo__text">
          <a href={`${base}/`} title="Federal Carbon Footprint">
            Federal Carbon Footprint
          </a>
        </em>
      </div>
      <button on:click|preventDefault={toggleOpen} class="usa-menu-btn">
        Menu
      </button>
    </div>
    <nav aria-label="Primary navigation" class="usa-nav {visible}">
      <button on:click|preventDefault={toggleOpen} class="usa-nav__close">
        <img src={closeSvg} role="img" alt="Close" />
      </button>
      <ul class="usa-nav__primary usa-accordion">
        <li class="usa-nav__primary-item">
          <a class="usa-nav__link" class:usa-current={$page.path === '/'} sveltekit:prefetch href={`${base}/`}>Home</a>
        </li>
        <li class="usa-nav__primary-item">
          <a class="usa-nav__link" class:usa-current={$page.path === '/about'} sveltekit:prefetch href={`${base}/about`}>About this site</a>
        </li>
        <li class="usa-nav__primary-item">
          <a class="usa-nav__link" class:usa-current={$page.path === '/api/v1'} sveltekit:prefetch href={`${base}/api/v1`}>Data</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
