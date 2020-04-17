<?php
// blockchain.php
// Blockchain Handler
// By Abdullah Daud, chelahmy@gmail.com
// 5 April 2020

function brdb_get_table_id($name) {
	$where = equ('name', $name, 'string');
	$records = read(['table' => 'table', 'where' => $where]);
	
	if (count($records) > 0)
		return $records[0]['id'];

	return create('table', array(
		'name' => $name
	));
}

function brdb_get_table_name($id) {
	$where = equ('id', $id);
	$records = read(['table' => 'table', 'where' => $where]);
	
	if (count($records) > 0 && isset($records[0]['name']))
		return $records[0]['name'];

	return '';
}

function brdb_create_activity($table_name, $row_id, $row_rev_id) {
	$table_id = brdb_get_table_id($table_name);
	
	if ($table_id <= 0) return 0;
		
	return create('activity', array(
		'table_id' => $table_id,
		'row_id' => $row_id,
		'row_rev_id' => $row_rev_id
	));
}

function brdb_read_activity($id) {
	$where = equ('id', $id);
	$records = read(['table' => 'activity', 'where' => $where]);

	if (count($records) <= 0)
		return FALSE;

	return $records[0];
}

function brdb_read_last_activity() {
	$records = read(['table' => 'activity', 'order_by' => 'id', 'sort' => 'DESC', 'limit' => 1]);

	if (count($records) <= 0)
		return FALSE;
		
	return $records[0];
}

function brdb_create_request($table_name, $row_id, $row_rev_id, 
	$timestamp, $user_id, $user_rev_id, $signature) {

	$table_id = brdb_get_table_id($table_name);
	
	if ($table_id <= 0) return -1;
		
	$id = create('request', array(
		'table_id' => $table_id,
		'row_id' => $row_id,
		'row_rev_id' => $row_rev_id,
		'timestamp' => $timestamp,
		'user_id' => $user_id,
		'user_rev_id' => $user_rev_id,
		'signature' => $signature
	));
	
	if ($id <= 0) return -2;
	
	$act_id = brdb_create_activity('request', $id, 0);
	
	if ($act_id <= 0) {
		delete('request', equ('id', $id));
		return -3;
	}
	
	return $id;
}

function brdb_read_request($id) {
	$where = equ('id', $id);
	$records = read(['table' => 'request', 'where' => $where]);

	if (count($records) <= 0)
		return FALSE;
		
	return $records[0];
}

function brdb_create_block($activity_start_id, $activity_end_id, $activity_final_hash, $timestamp, $nonce, $hash) {
	return create('block', array(
		'activity_start_id' => $activity_start_id,
		'activity_end_id' => $activity_end_id,
		'activity_final_hash' => $activity_final_hash,
		'timestamp' => $timestamp,
		'nonce' => $nonce,
		'hash' => $hash
	));
}

function brdb_read_block($id) {
	$where = equ('id', $id);
	$records = read(['table' => 'block', 'where' => $where]);

	if (count($records) <= 0)
		return FALSE;
		
	return $records[0];
}

function brdb_read_last_block($id) {
	$records = read(['table' => 'block', 'order_by' => 'id', 'sort' => 'DESC', 'limit' => 1]);

	if (count($records) <= 0)
		return FALSE;
		
	return $records[0];
}

?>
