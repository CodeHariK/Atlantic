FROM golang:1.23.1-alpine3.20 AS build-stage

RUN go install github.com/pressly/goose/v3/cmd/goose@latest
