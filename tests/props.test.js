import PropTypes from 'prop-types';
import { propTypes, defaultProps } from '../src/props';

test('propTypes are well defined', () => {
  expect(defaultProps).toEqual({
    push: true,
    accessRoles: [],
    userRoles: [],
    loginPath: '/login',
    accessDeniedPath: '/access-denied',
    isAuthenticated: false,
  });
});

test('defaultProps are well defined', () => {
  expect(propTypes).toEqual({
    push: PropTypes.bool,
    location: PropTypes.object,
    accessRoles: PropTypes.array,
    userRoles: PropTypes.array,
    adminPath: PropTypes.string,
    accessDeniedPath: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    component: PropTypes.any,
  });
});
