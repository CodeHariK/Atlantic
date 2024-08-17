module github.com/codeharik/Atlantic/database

go 1.22.4

replace github.com/codeharik/Atlantic/config => ../config

require (
	connectrpc.com/connect v1.16.2
	connectrpc.com/grpcreflect v1.2.0
	github.com/codeharik/Atlantic/config v0.0.0-00010101000000-000000000000
	github.com/jackc/pgx/v5 v5.6.0
	google.golang.org/protobuf v1.34.2
)

require (
	github.com/gorilla/securecookie v1.1.2 // indirect
	github.com/gorilla/sessions v1.3.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	github.com/jackc/puddle/v2 v2.2.1 // indirect
	golang.org/x/crypto v0.17.0 // indirect
	golang.org/x/oauth2 v0.22.0 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/text v0.14.0 // indirect
)
