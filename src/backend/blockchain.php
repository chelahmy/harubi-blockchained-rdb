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

function brdb_create_activity($table_name, $row_id, $row_rev_id) {
	$table_id = brdb_get_table_id($table_name);
	
	if ($table_id <= 0)
		return 0;
		
	return create('activity', array(
		'table_id' => $table_id,
		'row_id' => $row_id,
		'row_rev_id' => $row_rev_ids
	));
}

?>
