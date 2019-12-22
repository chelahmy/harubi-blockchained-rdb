{
	"globals" : {
		"do_dump_log" : true,
		"do_log_sql_querystring" : true,
		"respond_with_logs" : false
	},

	"mysql" : {
		"hostname" : "localhost",
		"username" : "username",
		"password" : "password",
		"database" : "harubi_front",
		"prefix"   : ""
	},

	"tables" : {
		"user" : {
			"id" : "int",
			"name" : "string",
			"password" : "string",
			"email" : "string",
			"created_utc" : "int",
			"updated_utc" : "int"
		}
	}
}
