#!/usr/bin/env bash

function get_script_path(){
  echo `find ./node_modules -name $1 -print -quit`
}

function regenerate_dir(){
  [ -d $1 ] && rm -rf $1
  mkdir $1
}

PROTOC_GEN_TS_PATH=$(get_script_path "protoc-gen-ts")
GRPC_TOOLS_NODE_PROTOC_PLUGIN=$(get_script_path "grpc_tools_node_protoc_plugin")
GRPC_TOOLS_NODE_PROTOC=$(get_script_path "grpc_tools_node_protoc") 

PROTO_PATH=./src/proto
OUT_PATH=./src/__generated__
  
regenerate_dir $OUT_PATH

$GRPC_TOOLS_NODE_PROTOC \
    --js_out=import_style=commonjs,binary:$OUT_PATH \
    --grpc_out=$OUT_PATH \
    --plugin=protoc-gen-grpc=$GRPC_TOOLS_NODE_PROTOC_PLUGIN \
    -I "$PROTO_PATH" \
    "$PROTO_PATH"/*.proto

$GRPC_TOOLS_NODE_PROTOC \
    --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
    --ts_out=$OUT_PATH \
    -I "$PROTO_PATH" \
    "$PROTO_PATH"/*.proto


# Generate index.ts with all exports.
cd $OUT_PATH
echo $'/**\n *  GENERATED CODE -- DO NOT EDIT!\n *  protoc_build.sh\n */' >> ./index.ts
for p in `find . -name "*.js" -type f`; do
  echo "export * from '${p%.*}';" >> ./index.ts
done
