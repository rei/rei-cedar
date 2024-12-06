import App from 'srcdir/dev/App.vue';
import Examples from 'componentsdir/examples';

import KitchenSink from 'srcdir/dev/KitchenSink.vue';
import e2e1 from 'srcdir/dev/e2e1.vue';
import e2e2 from 'srcdir/dev/e2e2.vue';

// // Extra paths for backstop.
// //  These are smaller sections of larger demo pages to make screenshotting more reliable
// import DefaultButtons from 'componentsdir/button/examples/demo/Default';
// import FullWidthButtons from 'componentsdir/button/examples/demo/FullWidth';
// import IconButtons from 'componentsdir/button/examples/demo/Icons';
// import SecondaryButtons from 'componentsdir/button/examples/demo/Secondary';

// import AddressForm from 'componentsdir/Form/AddressForm';
// import LoginForm from 'componentsdir/Form/LoginForm';
// import PaymentForm from 'componentsdir/Form/PaymentForm';
// import SurveyForm from 'componentsdir/Form/SurveyForm';

const routes = [
  { path: '/', name: 'Home', component: App },
  { path: '/kitchen-sink', name: 'KitchenSink', component: KitchenSink },
  // { path: '/utilities', name: 'Utilities', component: Examples.utilities },
  { path: '/abstract', name: 'Abstract', component: Examples.abstract },
  { path: '/accordion', name: 'Accordion', component: Examples.accordion },
  { path: '/banner', name: 'Banner', component: Examples.banner },
  { path: '/breadcrumbs', name: 'Breadcrumb', component: Examples.breadcrumb },
  { path: '/buttons', name: 'Buttons', component: Examples.buttons },
  { path: '/captions', name: 'Captions', component: Examples.captions },
  { path: '/cards', name: 'Cards', component: Examples.card },
  { path: '/checkboxes', name: 'CheckBoxes', component: Examples.checkbox },
  { path: '/chips', name: 'Chip', component: Examples.chip },
  { path: '/choreographer', name: 'Choreographer', component: Examples.choreographer },
  { path: '/containers', name: 'Container', component: Examples.container },
  { path: '/formGroups', name: 'Form Groups', component: Examples.formGroup },
  { path: '/fulfillmentTile', name: 'FulfillmentTile', component: Examples.fulfillmentTile },
  { path: '/grid', name: 'Grid', component: Examples.grid },
  { path: '/icons', name: 'Icons', component: Examples.icon },
  { path: '/images', name: 'Images', component: Examples.images },
  { path: '/inputs', name: 'Input', component: Examples.inputs },
  { path: '/kicker', name: 'Kicker', component: Examples.kicker },
  { path: '/landing-lead', name: 'Landing Lead', component: Examples.landingLead },
  { path: '/layout', name: 'Layout', component: Examples.layout },
  { path: '/links', name: 'Links', component: Examples.links },
  { path: '/lists', name: 'Lists', component: Examples.list },
  { path: '/mediaObject', name: 'Media Object', component: Examples.mediaObject },
  { path: '/modals', name: 'Modals', component: Examples.modal },
  { path: '/pagination', name: 'Pagination', component: Examples.pagination },
  { path: '/picture', name: 'Picture', component: Examples.picture },
  { path: '/popover', name: 'Popover', component: Examples.popover },
  { path: '/presets', name: 'Text Presets', component: Examples.presets },
  { path: '/quotes', name: 'Quotes', component: Examples.quote },
  { path: '/radios', name: 'Radios', component: Examples.radio },
  { path: '/ratings', name: 'Ratings', component: Examples.rating },
  { path: '/selects', name: 'Selects', component: Examples.selects },
  { path: '/skeleton', name: 'Skeleton', component: Examples.skeleton },
  { path: '/split-surface', name: 'Split Surface', component: Examples.splitSurface },
  { path: '/surface', name: 'Surface', component: Examples.surface },
  { path: '/surfaceSelection', name: 'SurfaceSelection', component: Examples.surfaceSelection },
  { path: '/tables', name: 'Tables', component: Examples.tables },
  { path: '/tabs', name: 'Tabs', component: Examples.tabs },
  { path: '/texts', name: 'Texts', component: Examples.texts },
  { path: '/title', name: 'Title', component: Examples.title },
  { path: '/toast', name: 'Toast', component: Examples.toast },
  { path: '/toggleButton', name: 'ToggleButton', component: Examples.toggleButton },
  { path: '/switch', name: 'Switch', component: Examples.cdrSwitch },
  { path: '/tooltip', name: 'Tooltip', component: Examples.tooltip },
  { path: '/utility', name: 'Utility', component: Examples.utility },

  // Nightwatch test targets
  { path: '/e2e-1', component: e2e1 },
  { path: '/e2e-2', component: e2e2 },
];

export default routes;
