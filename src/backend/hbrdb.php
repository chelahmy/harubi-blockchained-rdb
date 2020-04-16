<?php
// hbrdb.php
// Harubi Blockchained Relational Database Generator
// By Abdullah Daud, chelahmy@gmail.com
// 10 March 2020

function colstr($name, $type, $size) {
  if ($type == "datetime")
    return "`$name` $type NOT NULL";
  return "`$name` $type($size) NOT NULL";
}

function clist_str($list) {
  $str = '';
  foreach ($list as $item) {
    if (strlen($str) > 0)
      $str .= "," . PHP_EOL;
    if (isset($item['size']))
      $str .= "  " . colstr($item['name'], $item['type'], $item['size']);
    else
      $str .= "  " . colstr($item['name'], $item['type'], 0);
  }
  if (strlen($str) > 0)
    $str .= PHP_EOL;
  return $str;
}

function create_table_str($name, $colstr = "", $engine = "InnoDB", $charset = "utf8") {
  $str = "CREATE TABLE `$name` (" . PHP_EOL;
  $str .= $colstr;
  $str .= ") ENGINE=$engine DEFAULT CHARSET=$charset;" . PHP_EOL;
  return $str;
}

function add_keys_str($tname, $keys) {
  $str = "ALTER TABLE `$tname`" . PHP_EOL;
  $kstr = "";
  foreach ($keys as $key) {
    $clist = "";
    if (is_array($key[1])) {
      foreach ($key[1] as $col) {
        if (strlen($clist) > 0)
          $clist .= ", ";
        $clist .= "`$col`";
      }
    }
    else
      $clist = "`" . $key[1] . "`";
    if (strlen($kstr) > 0)
      $kstr .= "," . PHP_EOL;
    $kname = $key[2];
    if ($key[0] == "primary")
      $kstr .= "  ADD PRIMARY KEY ($clist)";
    else if ($key[0] == "unique")
      $kstr .= "  ADD UNIQUE KEY `$kname` ($clist)";
    else if ($key[0] == "key")
      $kstr .= "  ADD KEY `$kname` ($clist)";
  }
  return $str . $kstr . ";" . PHP_EOL;
}

function add_autoinc_str($tname) {
  $str = "ALTER TABLE `$tname`" . PHP_EOL;
  $str .= "  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;" . PHP_EOL;
  return $str;
}

function idcol($name) {
  return ["name" => $name, "type" => "bigint", "size" => 20];
}

function add_opercols(&$clist) {
  $clist[] = ["name" => "oper", "type" => "int", "size" => 11];
  return $clist;
}

function add_operkey(&$keys) {
  $keys[] = ["key", "oper", "oper"];
  return $keys;
}

function add_signcols(&$clist) {
  $clist[] = ["name" => "timestamp", "type" => "datetime"];
  $clist[] = idcol("user_rev_id");
  $clist[] = ["name" => "signature", "type" => "varchar", "size" => 255];
  return $clist;
}

function create_timestamp_table_str() {
  $clist = [idcol("id")];
  $clist[] = ["name" => "timestamp", "type" => "datetime"];
  add_signcols($clist);
  $tname = "timestamp";
  $str = create_table_str($tname, clist_str($clist)) . PHP_EOL;
  $klist = [["primary", "id", "id"]];
  $klist[] = ["key", "timestamp", "timestamp"];
  $str .= add_keys_str($tname, $klist) . PHP_EOL;
  $str .= add_autoinc_str($tname) . PHP_EOL;
  return $str;
}

function create_table_table_str() {
  $clist = [idcol("id")];
  $clist[] = ["name" => "name", "type" => "varchar", "size" => 255];
  //add_signcols($clist);
  $tname = "table";
  $str = create_table_str($tname, clist_str($clist)) . PHP_EOL;
  $klist = [["primary", "id", "id"]];
  $klist[] = ["unique", "name", "name"];
  $str .= add_keys_str($tname, $klist) . PHP_EOL;
  $str .= add_autoinc_str($tname) . PHP_EOL;
  return $str;
}

function create_request_table_str() {
  $clist = [idcol("id"), idcol("user_id"), idcol("table_id"), idcol("row_id"), idcol("row_rev_id")];
  add_signcols($clist);
  $tname = "request";
  $str = create_table_str($tname, clist_str($clist)) . PHP_EOL;
  $klist = [["primary", "id", "id"]];
  $klist[] = ["key", "user_id", "user_id"];
  $klist[] = ["key", "table_id", "table_id"];
  $klist[] = ["key", ["table_id", "table_row_id"], "table_row_id"];
  $klist[] = ["key", ["user_id", "table_id"], "user_table_id"];
  $klist[] = ["key", ["user_id", "table_id", "table_row_id"], "user_table_row_id"];
  $str .= add_keys_str($tname, $klist) . PHP_EOL;
  $str .= add_autoinc_str($tname) . PHP_EOL;
  return $str;
}

function create_activity_table_str() {
  $clist = [idcol("id"), idcol("table_id"), idcol("row_id"), idcol("row_rev_id")];
  $tname = "activity";
  $str = create_table_str($tname, clist_str($clist)) . PHP_EOL;
  $klist = [["primary", "id", "id"]];
  $klist[] = ["key", "table_id", "table_id"];
  $klist[] = ["key", ["table_id", "table_row_id"], "table_row_id"];
  $klist[] = ["unique", ["table_id", "table_row_id", "table_row_rev_id"], "table_row_rev_id"];
  $str .= add_keys_str($tname, $klist) . PHP_EOL;
  $str .= add_autoinc_str($tname) . PHP_EOL;
  return $str;
}

function create_block_table_str() {
  $clist = [idcol("id"), idcol("activity_start_id"), idcol("activity_end_id")];
  $clist[] = ["name" => "activity_final_hash", "type" => "varbinary", "size" => 32];
  $clist[] = ["name" => "timestamp", "type" => "datetime"];
  $clist[] = ["name" => "nonce", "type" => "bigint", "size" => 20];
  $clist[] = ["name" => "hash", "type" => "varbinary", "size" => 32];
  $tname = "block";
  $str = create_table_str($tname, clist_str($clist)) . PHP_EOL;
  $klist = [["primary", "id", "id"]];
  $str .= add_keys_str($tname, $klist) . PHP_EOL;
  $str .= add_autoinc_str($tname) . PHP_EOL;
  return $str;
}

function generate_basic_tables() {
  $str = create_table_table_str();
  $str .= create_request_table_str();
  $str .= create_activity_table_str();
  $str .= create_block_table_str();
  return $str;
}

function generate_tables($filename = "hbrdb.json") {
  $str = "";
  $fd = file_get_contents($filename);
  $dt = json_decode($fd, TRUE);
  foreach ($dt["tables"] as $tname => $table) {
    // main table
    $clist = [idcol("id"), idcol($tname . "_rev_id")];
    foreach ($table["columns"] as $cname => $column) {
      $clist[] = array_merge(["name" => $cname], $column);
    }
    add_opercols($clist);
    add_signcols($clist);
    $str .= create_table_str($tname, clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"], ["key", $tname . "_rev_id", $tname . "_rev_id"]];
    foreach ($table["keys"] as $kname => $key) {
      $klist[] = array_merge($key, [$kname]);
    }
    add_operkey($klist);
    $str .= add_keys_str($tname, $klist) . PHP_EOL;
    $str .= add_autoinc_str($tname) . PHP_EOL;
    // revision table
    $clist = [idcol("id"), idcol("prev_id")];
    foreach ($table["columns"] as $cname => $column) {
      $clist[] = array_merge(["name" => $cname], $column);
    }
    add_opercols($clist);
    add_signcols($clist);
    $tname_rev = $tname . "_rev";
    $str .= create_table_str($tname_rev, clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"]];
    $str .= add_keys_str($tname_rev, $klist) . PHP_EOL;
    $str .= add_autoinc_str($tname_rev) . PHP_EOL;
  }
  return $str;
}

function generate_creating_rev($tname, $table) {
  $args = "";
  foreach ($table["columns"] as $cname => $column) {
  	$args .= "\$$cname, ";
  }
  $args .= PHP_EOL . "  \$user_id, \$timestamp, \$user_rev_id, \$signature";
  $tn = $tname . "_rev";
  $str = "function brdb_create_$tn($args) {" . PHP_EOL;
  $str .= "  \$id = create('$tn', array(" . PHP_EOL;
  $str .= "    'prev_id' => 0," . PHP_EOL;
  foreach ($table["columns"] as $cname => $column) {
    $str .= "    '$cname' => \$$cname," . PHP_EOL;
  }
  $str .= "    'user_id' => \$user_id," . PHP_EOL;
  $str .= "    'oper' => 1," . PHP_EOL;
  $str .= "    'timestamp' => \$timestamp," . PHP_EOL;
  $str .= "    'user_rev_id' => \$user_rev_id," . PHP_EOL;
  $str .= "    'signature' => \$signature" . PHP_EOL;
  $str .= "  ));" . PHP_EOL;
  $str .= "  return \$id;" . PHP_EOL;
  $str .= "}" . PHP_EOL;
  return $str;
}

function generate_creating($tname, $table) {
  $args = "";
  foreach ($table["columns"] as $cname => $column) {
  	$args .= "\$$cname, ";
  }
  $args .= PHP_EOL . "  \$user_id, \$timestamp, \$user_rev_id, \$signature";
  $str = generate_creating_rev($tname, $table) . PHP_EOL;
  $str .= "function brdb_create_$tname($args) {" . PHP_EOL;
  $t_rev =  $tname . "_rev";
  $t_rev_id = $tname . "_rev_id";
  $str .= "  \$$t_rev_id = brdb_create_$t_rev($args);" . PHP_EOL;
  $str .= "  if (\$$t_rev_id <= 0) return -1;" . PHP_EOL;
  $str .= "  \$id = create('$tname', array(" . PHP_EOL;
  $str .= "    '$t_rev_id' => \$$t_rev_id," . PHP_EOL;
  foreach ($table["columns"] as $cname => $column) {
    $str .= "    '$cname' => \$$cname," . PHP_EOL;
  }
  $str .= "    'user_id' => \$user_id," . PHP_EOL;
  $str .= "    'oper' => 1," . PHP_EOL;
  $str .= "    'timestamp' => \$timestamp," . PHP_EOL;
  $str .= "    'user_rev_id' => \$user_rev_id," . PHP_EOL;
  $str .= "    'signature' => \$signature" . PHP_EOL;
  $str .= "  ));" . PHP_EOL;
  $str .= "  if (\$id <= 0) {" . PHP_EOL;
  $str .= "    delete('$t_rev', equ('id', \$$t_rev_id));" . PHP_EOL;
  $str .= "    return -2;" . PHP_EOL;
  $str .= "  }" . PHP_EOL;
  $str .= "  \$act_id = brdb_create_activity('$tname', \$id, \$$t_rev_id);" . PHP_EOL;
  $str .= "  if (\$act_id <= 0) {" . PHP_EOL;
  $str .= "    delete('$t_rev', equ('id', \$$t_rev_id));" . PHP_EOL;
  $str .= "    delete('$tname', equ('id', \$id));" . PHP_EOL;
  $str .= "    return -3;" . PHP_EOL;
  $str .= "  }" . PHP_EOL;
  $str .= "  return \$id;" . PHP_EOL;
  $str .= "}" . PHP_EOL;
  return $str;
}

function generate_reading($tname, $table) {
  $str = "function brdb_read_$tname(\$id) {" . PHP_EOL;
  $str .= "  \$where = equ('id', \$id);" . PHP_EOL;
  $str .= "  \$records = read(['table' => '$tname', 'where' => \$where]);" . PHP_EOL;
  $str .= "  if (count(\$records) <= 0)" . PHP_EOL;
  $str .= "    return FALSE;" . PHP_EOL;
  $str .= "  return \$records[0];" . PHP_EOL;
  $str .= "}" . PHP_EOL;
  return $str;
}

function generate_reading_by_name($tname, $table) {
  $str = "function brdb_read_$tname" . "_by_name(\$name) {" . PHP_EOL;
  $str .= "  \$where = equ('name', \$name, 'string');" . PHP_EOL;
  $str .= "  \$records = read(['table' => '$tname', 'where' => \$where]);" . PHP_EOL;
  $str .= "  if (count(\$records) <= 0)" . PHP_EOL;
  $str .= "    return FALSE;" . PHP_EOL;
  $str .= "  return \$records[0];" . PHP_EOL;
  $str .= "}" . PHP_EOL;
  return $str;
}

function generate_request($tname, $table) {
  $args = "\$record,";
  $s_args = PHP_EOL . "  \$user_id, \$timestamp, \$user_rev_id, \$signature";
  $str = "function brdb_request_$tname($args $s_args) {" . PHP_EOL;
  $rev_id = $tname . '_rev_id';
  $str .= "  \$req_id = brdb_create_request('$tname', \$record['id'], \$record['$rev_id'], $s_args);" . PHP_EOL;
  $str .= "  if (\$req_id <= 0) return -1;" . PHP_EOL;
  $str .= "  \$act_id = brdb_create_activity('request', \$req_id, 0);" . PHP_EOL;
  $str .= "  if (\$act_id <= 0) {" . PHP_EOL;
  $str .= "    delete('request', equ('id', \$req_id));" . PHP_EOL;
  $str .= "    return -2;" . PHP_EOL;
  $str .= "  }" . PHP_EOL;
  $str .= "  return \$req_id;" . PHP_EOL;
  $str .= "}" . PHP_EOL;
  return $str;
}

function generate_crud($filename = "hbrdb.json") {
  $str = "";
  $fd = file_get_contents($filename);
  $dt = json_decode($fd, TRUE);
  foreach ($dt["tables"] as $tname => $table) {
  	$str .= generate_creating($tname, $table) . PHP_EOL;
  	$str .= generate_reading($tname, $table) . PHP_EOL;
  	if (array_key_exists('name', $table["columns"]))
  	  $str .= generate_reading_by_name($tname, $table) . PHP_EOL;
  	$str .= generate_request($tname, $table) . PHP_EOL;
  }
  return $str;
}

echo generate_basic_tables();
echo generate_tables();
echo generate_crud();

?>
