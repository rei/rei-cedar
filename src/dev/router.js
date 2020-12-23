import App from 'srcdir/App';
import Examples from 'componentsdir/examples';

import KitchenSink from 'srcdir/dev/KitchenSink';
import e2e1 from 'srcdir/dev/e2e1';
import e2e2 from 'srcdir/dev/e2e2';
import FallDemo from 'srcdir/dev/FallDemo';

// Extra paths for backstop.
//  These are smaller sections of larger demo pages to make screenshotting more reliable
import DefaultButtons from 'componentsdir/button/examples/demo/Default';
import FullWidthButtons from 'componentsdir/button/examples/demo/FullWidth';
import IconButtons from 'componentsdir/button/examples/demo/Icons';
import SecondaryButtons from 'componentsdir/button/examples/demo/Secondary';

import InsetUtilities from 'componentsdir/Utilities/demos/inset';
import PaddingSpacingUtilities from 'componentsdir/Utilities/demos/paddingSpacing';
import MarginSpacingUtilities from 'componentsdir/Utilities/demos/marginSpacing';
import ContainerUtilities from 'componentsdir/Utilities/demos/container';
import AlignUtilities from 'componentsdir/Utilities/demos/align';
import VisibilityUtilities from 'componentsdir/Utilities/demos/visibility';

import AddressForm from 'componentsdir/Form/AddressForm';
import LoginForm from 'componentsdir/Form/LoginForm';
import PaymentForm from 'componentsdir/Form/PaymentForm';
import SurveyForm from 'componentsdir/Form/SurveyForm';

const routes = [
  { path: '/', name: ' ', component: App },
  { path: '/kitchen-sink', name: 'KitchenSink', component: KitchenSink },
  { path: '/utilities', name: 'Utilities', component: Examples.utilities },
  { path: '/accordion', name: 'Accordion', component: Examples.accordion },
  { path: '/alert', name: 'Alert', component: Examples.alert },
  { path: '/breadcrumbs', name: 'Breadcrumb', component: Examples.breadcrumb },
  { path: '/buttons', name: 'Buttons', component: Examples.buttons },
  { path: '/captions', name: 'Captions', component: Examples.captions },
  { path: '/cards', name: 'Cards', component: Examples.card },
  { path: '/checkboxes', name: 'CheckBoxes', component: Examples.checkbox },
  { path: '/formGroups', name: 'Form Groups', component: Examples.formGroup },
  { path: '/form', name: 'Form Patterns', component: Examples.forms },
  { path: '/grids', name: 'Grids', component: Examples.grid },
  { path: '/grid-two', name: 'Grid v2', component: Examples.gridTwo },
  { path: '/icons', name: 'Icons', component: Examples.icon },
  { path: '/images', name: 'Images', component: Examples.images },
  { path: '/inputs', name: 'Input', component: Examples.inputs },
  { path: '/links', name: 'Links', component: Examples.links },
  { path: '/lists', name: 'Lists', component: Examples.list },
  { path: '/modals', name: 'Modals', component: Examples.modal },
  { path: '/pagination', name: 'Pagination', component: Examples.pagination },
  { path: '/popover', name: 'Popover', component: Examples.popover },
  { path: '/quotes', name: 'Quotes', component: Examples.quote },
  { path: '/radios', name: 'Radios', component: Examples.radio },
  { path: '/ratings', name: 'Ratings', component: Examples.rating },
  { path: '/selects', name: 'Selects', component: Examples.selects },
  { path: '/tables', name: 'Tables', component: Examples.tables },
  { path: '/tabs', name: 'Tabs', component: Examples.tabs },
  { path: '/texts', name: 'Texts', component: Examples.texts },
  { path: '/tooltip', name: 'Tooltip', component: Examples.tooltip },

  // Backstop test targets
  { path: '/default-buttons', component: DefaultButtons },
  { path: '/secondary-buttons', component: SecondaryButtons },
  { path: '/full-width-buttons', component: FullWidthButtons },
  { path: '/icon-buttons', component: IconButtons },
  { path: '/padding-spacing-utilities', component: PaddingSpacingUtilities },
  { path: '/margin-spacing-utilities', component: MarginSpacingUtilities },
  { path: '/inset-utilities', component: InsetUtilities },
  { path: '/container-utilities', component: ContainerUtilities },
  { path: '/align-utilities', component: AlignUtilities },
  { path: '/visibility-utilities', component: VisibilityUtilities },

  // form examples
  { path: '/address-form', component: AddressForm },
  { path: '/login-form', component: LoginForm },
  { path: '/survey-form', component: SurveyForm },
  { path: '/payment-form', component: PaymentForm },

  // Nightwatch test targets
  { path: '/e2e-1', component: e2e1 },
  { path: '/e2e-2', component: e2e2 },


  { path: '/fall-demo', component: FallDemo },
];

export default routes;
