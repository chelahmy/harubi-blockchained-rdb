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

function add_statuscols(&$clist) {
  $clist[] = ["name" => "status", "type" => "int", "size" => 11];
  return $clist;
}

function add_statuskey(&$keys) {
  $keys[] = ["key", "status", "status"];
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
  add_signcols($clist);
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
    add_statuscols($clist);
    add_signcols($clist);
    $str .= create_table_str($tname, clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"]];
    foreach ($table["keys"] as $kname => $key) {
      $klist[] = array_merge($key, [$kname]);
    }
    add_statuskey($klist);
    $str .= add_keys_str($tname, $klist) . PHP_EOL;
    $str .= add_autoinc_str($tname) . PHP_EOL;
    // revision table
    $clist = [idcol("id"), idcol("prev_id"), idcol($tname . "_id")];
    foreach ($table["columns"] as $cname => $column) {
      $clist[] = array_merge(["name" => $cname], $column);
    }
    add_statuscols($clist);
    add_signcols($clist);
    $tname_rev = $tname . "_rev";
    $str .= create_table_str($tname_rev, clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"]];
    $str .= add_keys_str($tname_rev, $klist) . PHP_EOL;
    $str .= add_autoinc_str($tname_rev) . PHP_EOL;
  }
  //$str .= create_timestamp_table_str();
  $str .= create_table_table_str();
  $str .= create_request_table_str();
  $str .= create_activity_table_str();
  $str .= create_block_table_str();
  return $str;
}

echo generate_tables();

?>
