#!/usr/bin/env bash

function delete_dir(){
  rm -rf $1
}

delete_dir ./src/__generated__

