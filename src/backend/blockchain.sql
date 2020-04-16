CREATE TABLE `table` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE `request` (
  `id` bigint(20) NOT NULL,
  `table_id` bigint(20) NOT NULL,
  `row_id` bigint(20) NOT NULL,
  `row_rev_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `timestamp` datetime NOT NULL,
  `user_rev_id` bigint(20) NOT NULL,
  `signature` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `table_row_id` (`table_id`, `table_row_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_table_id` (`user_id`, `table_id`),
  ADD KEY `user_table_row_id` (`user_id`, `table_id`, `table_row_id`);

ALTER TABLE `request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE `activity` (
  `id` bigint(20) NOT NULL,
  `table_id` bigint(20) NOT NULL,
  `row_id` bigint(20) NOT NULL,
  `row_rev_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `table_row_id` (`table_id`, `table_row_id`),
  ADD UNIQUE KEY `table_row_rev_id` (`table_id`, `table_row_id`, `table_row_rev_id`);

ALTER TABLE `activity`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE `block` (
  `id` bigint(20) NOT NULL,
  `activity_start_id` bigint(20) NOT NULL,
  `activity_end_id` bigint(20) NOT NULL,
  `activity_final_hash` varbinary(32) NOT NULL,
  `timestamp` datetime NOT NULL,
  `nonce` bigint(20) NOT NULL,
  `hash` varbinary(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `block`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `block`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


