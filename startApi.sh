#!/bin/bash
export $(cat .env | xargs) && gulp start-dev-api
