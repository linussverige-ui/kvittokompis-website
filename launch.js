import { launch } from './launch-config.js';

function secureUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

const interestForm = secureUrl(launch.verifiedBetaInterestForm);
const interestLink = document.querySelector('#beta-form-link');
const privacyContact = typeof launch.privacyContact === 'string' &&
  /^[a-z0-9.!#$%&'*+/=_`{|}~-]+@kvittokompis\.se$/i.test(launch.privacyContact);
if (privacyContact) {
  const contact = document.querySelector('#privacy-contact');
  if (contact) {
    contact.href = 'mailto:' + launch.privacyContact;
    contact.textContent = launch.privacyContact;
    document.querySelector('#privacy-contact-info').hidden = false;
  }
}

if (interestLink && interestForm?.hostname.endsWith('.sibforms.com') && privacyContact) {
  interestLink.href = interestForm.href;
  interestLink.hidden = false;
  document.querySelector('#beta-description').textContent =
    'Lämna din e-postadress och välj bransch om du vill. Bekräfta sedan med länken i mejlet. Vi kontaktar dig om en testplats blir aktuell.';
  document.querySelector('#beta-status').hidden = false;
}

const status = document.querySelector('#launch-status');
const content = document.querySelector('#launch-content');

if (status && content) {
  if (launch.mode === 'beta-launch') {
    const betaApp = secureUrl(launch.betaApp);
    if (betaApp) {
      status.textContent = 'Begränsad beta · Åtkomst för inbjudna';
      addLaunchLink(betaApp, 'Öppna betan för inbjudna');
    }
  } else if (launch.mode === 'public-launch') {
    const publicApp = secureUrl(launch.publicApp);
    if (publicApp) {
      status.textContent = 'KvittoKompis är tillgängligt';
      const signup = secureUrl(launch.publicSignup);
      addLaunchLink(signup || publicApp, signup ? 'Skapa konto' : 'Öppna KvittoKompis');
      addLaunchSection('#installation-template', '[data-app-link]', publicApp);
      const plans = secureUrl(launch.publicPlans);
      if (plans) addLaunchSection('#plans-template', '[data-plans-link]', plans);
    }
  }
}

function addLaunchLink(url, text) {
  const link = document.createElement('a');
  link.href = url.href;
  link.className = 'button button-outline';
  link.textContent = text;
  document.querySelector('.actions').append(link);
}

function addLaunchSection(template, selector, url) {
  const section = document.querySelector(template).content.cloneNode(true);
  section.querySelector(selector).href = url.href;
  content.append(section);
}
