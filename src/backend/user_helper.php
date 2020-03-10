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

function _update_user($password, $email, $seed, $where)
{
	$now = time();
	$fields = ['updated_utc' => $now];

	if (strlen($password) > 0)
	{
		$hash = password_hash($password, PASSWORD_BCRYPT);
		$fields['password'] = $hash;
	}

	if (strlen($email) > 0)
		$fields['email'] = $email;

	if (strlen($seed) > 0)
		$fields['seed'] = $seed;

	if (update('user', $fields, $where))
		return respond_ok();

	if (count($fields) <= 1)
		return respond_error(1, "Nothing to update.");

	return respond_error(2, "Could not update user record.");
}

?>
