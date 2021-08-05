import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Alert } from '@material-ui/core';

//وارد کردن تابع اکشن مربوط به تست ارتباط
import { checkConnection } from '../../actions/user.action';

const ConnectionCheckScreen = () => {
	const dispatch = useDispatch();

	//استخراج استیت های مربوط به تست ارتباط
	const connectionCheck = useSelector((state) => state.connectionCheck);
	const { loading, error, message } = connectionCheck;

	//تابع اجرای بررسی تست ارتباط
	const handleCheckConnection = (e) => {
		e.preventDefault();
		dispatch(checkConnection());
	};

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<h1>تست ارتباط با سرور</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={9}>
						<div>
						<h5 style={{ fontSize: '18px' }}>برای بررسی ارتباط با سامانه بر روی دکمه کلیک کنید.</h5>
						</div>
					</Grid>

					<Grid item xs={12} sm={3}>
						<Button variant="contained" color="primary" onClick={handleCheckConnection}>
							تست ارتباط
						</Button>
					</Grid>
				</Grid>
			</div>

			{loading ? (
				<h3>در حال بررسی ارتباط با سرور ...</h3>
			) : error ? (
				<div>
					<Alert severity="error">{error}</Alert>
				</div>
			) : message ? (
				<div>
					<Alert severity="success">{message}</Alert>
				</div>
			) : null}
		</div>
	);
};

export default ConnectionCheckScreen;