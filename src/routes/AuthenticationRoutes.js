import React, { lazy } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MinimalLayout from './../layout/MinimalLayout';

import ErrorBoundary from '../ui-component/ErrorBoundary/ErrorBoundary';

// login option 3
const AuthLogin3 = lazy(() => import('../views/pages/authentication/authentication3/Login3'));
const AuthRegister3 = lazy(() => import('../views/pages/authentication/authentication3/Register3'));
const ResetPasswordScreen = lazy(() => import('../views/pages/authentication/reset-password/ResetPasswordScreen'));
const CheckUserEmailScreen = lazy(() =>
	import('../views/pages/authentication/check-user-email-screen/CheckUserEmailScreen')
);

const AuthenticationRoutes = () => {
	const location = useLocation();

	// چک کردن لاگین بودن کاربر
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<Route path={[ '/user/login', '/user/resetpassword', '/user/forgetpassword', '/pages/register/register3' ]}>
			<MinimalLayout>
				<ErrorBoundary>
					<Switch location={location} key={location.pathname}>
						<Route path="/user/login" render={() => (userInfo ? <Redirect to="/" /> : <AuthLogin3 />)} />
						<Route
							path="/user/resetpassword"
							render={() => (userInfo ? <Redirect to="/" /> : <ResetPasswordScreen />)}
						/>
						<Route
							path="/user/forgetpassword"
							render={() => (userInfo ? <Redirect to="/" /> : <CheckUserEmailScreen />)}
						/>
						<Route path="/pages/register/register3" component={AuthRegister3} />
					</Switch>
				</ErrorBoundary>
			</MinimalLayout>
		</Route>
	);
};

export default AuthenticationRoutes;
