import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

export const getVerifiedUserId = (authToken) => {
  // Verify and get user id from token
  const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
  return userId;
};

export const handleLogin = (token) => {
  cookie.set('token', token);
  Router.push('/account');
};

export const handleLogout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
};

export const syncLogout = (event) => {
  if (event.key === 'logout') {
    Router.push('/login');
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // redirect on server
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // redirect on client
    Router.push(location);
  }
};

export const isAdmin = (user) => user.role === 'admin';
export const isRoot = (user) => user.role === 'root';
export const isRootOrAdmin = (user) => isRoot(user) || isAdmin(user);

export const checkUserRole = (ctx, user) => {
  const isNotPermitted = !(isRoot(user) || isAdmin(user)) && ctx.pathname === '/create';
  if (isNotPermitted) {
    redirectUser(ctx, '/');
  }
};
