#!/bin/bash

export DEBUG=goodpass:*
nohup node bin/www > logs/main.log 2>&1 &