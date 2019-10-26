import cookie from 'js-cookie';
import Router from 'next/router';

export const handleLogin = (token) => {
  cookie.set('token', token);
  Router.push('/account');
};

export const handleLogout = () => {
  cookie.remove('token');
  Router.push('/login');
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
