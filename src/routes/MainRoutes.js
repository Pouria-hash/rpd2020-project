import React, { lazy } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from './../layout/MainLayout';

import ErrorBoundary from '../ui-component/ErrorBoundary/ErrorBoundary';

// ایمپورت کامپوننت صفحه های برنامه
const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const TableBasic = lazy(() => import('../views/forms/tables/TableBasic'));
const TableDense = lazy(() => import('../views/forms/tables/TableDense'));
const ConnectionCheckScreen = lazy(() => import('../views/connectionCheck/ConnectionCheckScreen'));
const ChangePasswordScreen = lazy(() => import('../views/pages/authentication/change-password/ChangePasswordScreen'));

const MainRoutes = () => {
	const location = useLocation();

	//برای نشان دادن لاگین بودن کاربر
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<Route
			path={[
				'/dashboard/default',
				'/connection',
				'/user/changepassword',
				'/tables/tbl-basic',
				'/tables/tbl-dense',
				'/sample-page'
			]}
		>
			<MainLayout showBreadcrumb={true}>
				<ErrorBoundary>
					<Switch location={location} key={location.pathname}>
						{/* مسیر مربوط به صفحه داشبورد */}
						<Route
							path="/dashboard/default"
							render={() => (userInfo ? <DashboardDefault /> : <Redirect to="/user/login" />)}
						/>
						{/*مسیر مربوط به تست ارتباط با سرور*/}
						<Route
							path="/connection"
							render={() => (userInfo ? <ConnectionCheckScreen /> : <Redirect to="/user/login" />)}
						/>
						{/*مسیر مربوط به تغییر رمز ورود */}
						<Route
							path="/user/changepassword"
							render={() => (userInfo ? <ChangePasswordScreen /> : <Redirect to="/user/login" />)}
						/>
						<Route path="/tables/tbl-basic" component={TableBasic} />
						<Route path="/tables/tbl-dense" component={TableDense} />
					</Switch>
				</ErrorBoundary>
			</MainLayout>
		</Route>
	);
};

export default MainRoutes;
