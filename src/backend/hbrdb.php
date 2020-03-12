<?php
// hbrdb.php
// Harubi Blockchain Relational Database Generator
// By Abdullah Daud, chelahmy@gmail.com
// 10 March 2020

function colstr($name, $type, $size) {
  return "`$name` $type($size) NOT NULL";
}

function clist_str($list) {
  $str = '';
  foreach ($list as $item) {
    if (strlen($str) > 0)
      $str .= "," . PHP_EOL;
    $str .= "  " . colstr($item['name'], $item['type'], $item['size']);
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
          $clist .= ",";
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

function idcol($name) {
  return ["name" => $name, "type" => "bigint", "size" => 20];
}

function add_signcols(&$clist) {
  $clist[] = idcol("timestamp_id");
  $clist[] = idcol("user_rev_id");
  $clist[] = ["name" => "digest", "type" => "varbinary", "size" => 32];
  $clist[] = ["name" => "signature", "type" => "varchar", "size" => 255];
  return $clist;
}

function generate($filename = "hbrdb.json") {
  $str = "";
  $fd = file_get_contents($filename);
  $dt = json_decode($fd, TRUE);
  foreach ($dt["tables"] as $tname => $table) {
    // main table
    $clist = [idcol("id"), idcol($tname . "_rev_id")];
    foreach ($table["columns"] as $cname => $column) {
      $clist[] = array_merge(["name" => $cname], $column);
    }
    add_signcols($clist);
    $str .= create_table_str($tname, clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"]];
    foreach ($table["keys"] as $kname => $key) {
      $klist[] = array_merge($key, [$kname]);
    }
    $str .= add_keys_str($tname, $klist) . PHP_EOL;
    // revision table
    $clist = [idcol("id"), idcol("prev_id"), idcol($tname . "_id")];
    foreach ($table["columns"] as $cname => $column) {
      $clist[] = array_merge(["name" => $cname], $column);
    }
    add_signcols($clist);
    $str .= create_table_str($tname . "_rev", clist_str($clist)) . PHP_EOL;
    $klist = [["primary", "id", "id"]];
    $str .= add_keys_str($tname . "_rev", $klist) . PHP_EOL;
  }
  return $str;
}

echo generate();

?>
