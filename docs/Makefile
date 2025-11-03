gen:
	buf generate --include-imports --path proto/user --path proto/auth -o openapi/auth
	mv openapi/auth/openapi/apidocs.swagger.json openapi/auth/openapi.json && rm -rf openapi/auth/openapi

	buf generate --include-imports --path proto/cosmog -o openapi/cosmog
	mv openapi/cosmog/openapi/apidocs.swagger.json openapi/cosmog/openapi.json && rm -rf openapi/cosmog/openapi

	buf generate --include-imports --path proto/inventory -o openapi/inventory
	mv openapi/inventory/openapi/apidocs.swagger.json openapi/inventory/openapi.json && rm -rf openapi/inventory/openapi

	buf generate --include-imports --path proto/product -o openapi/product
	mv openapi/product/openapi/apidocs.swagger.json openapi/product/openapi.json && rm -rf openapi/product/openapi
