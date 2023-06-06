import { create } from '@storybook/theming/create';
import logo from '../../../templates/svg/logotype.svg';

export default create({
  base: 'light',
  // Typography
  fontBase: 'Marianne, sans-serif',
  fontCode: 'monospace',

  brandTitle: 'data.gouv.fr Storybook',
  brandUrl: 'https://www.data.gouv.fr',
  brandImage: logo,
  colorPrimary: '#161616',
  colorSecondary: '#3558a2'
});
