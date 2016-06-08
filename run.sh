#!/bin/bash
nohup DEBUG=goodpass:* node bin/www > logs/main.log 2>&1 &