#!/bin/bash
nohup sudo DEBUG=goodpass:* node bin/www > logs/main.log 2>&1 &