{
	"globals" : {
		"do_dump_log" : true,
		"do_log_sql_querystring" : true,
		"respond_with_logs" : false
	},

	"mysql" : {
		"hostname" : "localhost",
		"username" : "",
		"password" : "",
		"database" : "harubi_brdb",
		"prefix"   : ""
	},

	"tables" : {
		"user" : {
			"id" : "int",
			"name" : "string",
			"password" : "string",
			"email" : "string",
			"seed" : "string",
			"status" : "int",
			"created_utc" : "int",
			"updated_utc" : "int"
		}
	}
}
