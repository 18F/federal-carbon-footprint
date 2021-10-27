<script lang="ts">
  import logoImg from '../../node_modules/uswds/src/img/logo-img.png';
  import { GITHUB_REPO } from '$lib/context';
  import { getBranchTreeUrl } from '$lib/github';
</script>

<footer class="usa-footer usa-footer--slim">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
  <div class="usa-footer__primary-section">
    <div class="usa-footer__primary-container grid-row">
      <div class="mobile-lg:grid-col-12">
        <nav class="usa-footer__nav" aria-label="Footer navigation,">
          <ul class="grid-row grid-gap">
            <li
              class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content"
            >
              <a class="usa-footer__primary-link" href="https://10x.gsa.gov/">
                10x
              </a>
            </li>
            <li
              class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content"
            >
              <a
                class="usa-footer__primary-link"
                href={getBranchTreeUrl(GITHUB_REPO)}
              >
                Source code
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div class="usa-footer__secondary-section">
    <div class="grid-container">
      <div class="usa-footer__logo grid-row grid-gap-2">
        <div class="grid-col-auto">
          <img class="usa-footer__logo-img" src={logoImg} alt="" />
        </div>
        <div class="grid-col-auto">
          <p class="usa-footer__logo-heading">
            General Services Administration
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
