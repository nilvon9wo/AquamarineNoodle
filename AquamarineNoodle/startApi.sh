#!/bin/bash
gulp transpile-api
export $(cat .env | xargs) && node dist/api/app
