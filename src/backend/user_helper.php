<?php
// Helper functions for user.php

function get_user_id()
{
	if (isset($_SESSION['user']) && isset($_SESSION['user']['id']))
		return $_SESSION['user']['id'];
		
	return 0;
}

function is_super_user()
{
	return get_user_id() == 1 ? TRUE : FALSE;
}

function _update_user($password, $email, $where)
{
	$now = time();

	if (strlen($password) > 0)
	{
		$hash = password_hash($password, PASSWORD_BCRYPT);
		
		if (strlen($email) > 0)
		{
			if (update('user', array('password' => $hash, 'email' => $email, 'updated_utc' => $now), $where))
				return respond_ok();
		}
		else
		{
			if (update('user', array('password' => $hash, 'updated_utc' => $now), $where))
				return respond_ok();
		}
	}
	elseif (strlen($email) > 0)
	{
		if (update('user', array('email' => $email, 'updated_utc' => $now), $where))
			return respond_ok();
	}
	else
		return respond_error(1, "Nothing to update.");

	return respond_error(2, "Could not update user record."); 
}

?>
