#!/bin/bash
nohup sudo DEBUG=passgen:* node bin/www > logs/main.log 2>&1 &