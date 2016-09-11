#!/bin/bash
export $(cat .env | xargs) && node dist/api/app
