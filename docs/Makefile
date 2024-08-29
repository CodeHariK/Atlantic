gen:
	buf generate --path proto/user --path proto/auth -o openapi/auth && mv openapi/auth/openapi/apidocs.swagger.json openapi/auth/openapi.json && rm -rf openapi/auth/openapi
	
	buf generate --path proto/product -o openapi/product && mv openapi/product/openapi/apidocs.swagger.json openapi/product/openapi.json && rm -rf openapi/product/openapi
