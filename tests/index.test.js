import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute, { determineAccessFunction, authenticatedRouteFunction, roleAllowedFunction } from '../src/index';

test('PrivateRoute renders successfully', () => {
  const mockComponent = <div></div>;
  const mockRest = { hasProperties: 'mockRest' };
  const mockProps = { component: mockComponent, ...mockRest };
  const mockDetermineAccess = (props, rest, Component) => {
    // expect(props).toEqual(expect.objectContaining(mockProps));
    expect(rest).toEqual(expect.objectContaining(mockRest));
    expect(Component).toEqual(expect.objectContaining(mockComponent));
    return mockComponent;
  };
  const componentToRender = mount(<MemoryRouter><PrivateRoute {...mockProps} injectedDetermineAccess={mockDetermineAccess} /></MemoryRouter>);
  componentToRender.render();
});

test('determineAccessFunction determines if the user role was passed in and if so, if one of the user roles is on the access list', () => {
  const mockProps = { hasProperties: 'mockProps' };
  const mockComponent = () => <div></div>;
  const mockRest = { hasProperties: 'mockRest' };
  const mockAuthenticatedRoute = (values, rest, component) => component;
  const mockRoleAllowed = () => true;
  const mockRoleNotAllowed = () => false;
  expect(determineAccessFunction(mockProps, mockRest, mockComponent, mockAuthenticatedRoute, mockRoleAllowed)).toEqual(mockComponent);
  expect(determineAccessFunction(mockProps, mockRest, mockComponent, mockAuthenticatedRoute, mockRoleNotAllowed).type.name).toEqual('Redirect');
});

test('authenticatedRouteFunction returns component if authenticated and user has access, otherwise redirects', () => {
  const mockValues = { hasProperties: 'mockValues' };
  const mockRestAuthenticated = { hasProperties: 'mockRestAuthenticated', isAuthenticated: true };
  const mockRestNotAuthenticated = { hasProperties: 'mockRestNotAuthenticated', isAuthenticated: false };
  const mockComponent = () => <div></div>;
  const component = authenticatedRouteFunction(mockValues, mockRestAuthenticated, mockComponent);
  expect(component.type.name).toEqual('mockComponent');
  expect(component.props).toEqual(mockRestAuthenticated);
  expect(authenticatedRouteFunction(mockValues, mockRestNotAuthenticated, mockComponent).type.name).toEqual('Redirect');
});

test('roleAllowedFunction determins if the user has a role that is authorized for this route', () => {
  const mockRestAllRolesAllowed = { hasProperties: 'mockRestAllRolesAllowed', accessRoles: [] };
  const mockRestNoMatchingRoles = { accessRoles: ['TEST_ROLE'], userRoles: ['NO_ACCESS'] };
  const mockRestMatchingRole = { accessRoles: ['TEST_ROLE'], userRoles: ['TEST_ROLE'] };
  expect(roleAllowedFunction(mockRestAllRolesAllowed)).toBeTruthy();
  expect(roleAllowedFunction(mockRestNoMatchingRoles)).toBeFalsy();
  expect(roleAllowedFunction(mockRestMatchingRole)).toBeTruthy();
});
