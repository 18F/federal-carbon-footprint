<script>
  let bannerOpen = false;
  const toggleBanner = () => {
    bannerOpen = !bannerOpen;
  };
  import iconDotGov from '../../node_modules/uswds/src/img/icon-dot-gov.svg';
  import iconHttps from '../../node_modules/uswds/src/img/icon-https.svg';
  import usFlagSmall from '../../node_modules/uswds/src/img/us_flag_small.png';
</script>

<section class="usa-banner z-500" aria-label="Official government website">
  <div class="usa-accordion">
    <header class="usa-banner__header {bannerOpen ? '' : 'usa-banner__header--expanded'}">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img class="usa-banner__header-flag" src={usFlagSmall} alt="U.S. flag" />
        </div>
        <div class="grid-col-fill tablet:grid-col-auto">
          <p class="usa-banner__header-text">An official website of the United States government</p>
          <p class="usa-banner__header-action" aria-hidden="true">Here’s how you know</p>
        </div>
        <button
          on:click|preventDefault={toggleBanner}
          class="usa-accordion__button usa-banner__button"
          aria-expanded={bannerOpen}
          aria-controls="gov-banner-federalist"
        >
          <span class="usa-banner__button-text">Here’s how you know</span>
        </button>
      </div>
    </header>
    <div
      class="usa-banner__content usa-accordion__content"
      id="gov-banner-federalist"
      hidden={!bannerOpen}
    >
      <div class="grid-row grid-gap-lg">
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src={iconDotGov} alt="Dot gov" />
          <div class="usa-media-block__body">
            <p>
              <strong>The .gov means it’s official.</strong>
              <br />
              Federal government websites often end in .gov or .mil. Before sharing sensitive information,
              make sure you’re on a federal government site.
            </p>
          </div>
        </div>
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src={iconHttps} alt="Https" />
          <div class="usa-media-block__body">
            <p>
              <strong>The site is secure.</strong>
              <br />
              The
              <strong>https://</strong>
              ensures that you are connecting to the official website and that any information you provide
              is encrypted and transmitted securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
