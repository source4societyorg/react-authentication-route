import PropTypes from 'prop-types';

export const defaultProps = {
  push: true,
  accessRoles: [],
  userRoles: [],
  loginPath: '/login',
  accessDeniedPath: '/access-denied',
  isAuthenticated: false,
};

export const propTypes = {
  push: PropTypes.bool,
  location: PropTypes.object,
  accessRoles: PropTypes.array,
  userRoles: PropTypes.array,
  adminPath: PropTypes.string,
  accessDeniedPath: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  component: PropTypes.any,
};
