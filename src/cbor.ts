// Copyright 2024 The Tari Project
// SPDX-License-Identifier: BSD-3-Clause

/* eslint-disable @typescript-eslint/no-explicit-any */

export type CborValue = { Map: Array<[any, any]> } |
  { Array: Array<any> } |
  { Tag: number } |
  { Bool: boolean } |
  { Bytes: Array<number> } |
  { Text: string } |
  { Float: number } |
  { Int: number } |
  { Null: null };

export function getValueByPath(cborRepr: CborValue | null, path: string): any {
  if (!cborRepr) {
    return null;
  }
  let value: any = cborRepr;
  for (const part of path.split(".")) {
    if (part == "$") {
      continue;
    }
    if (value === null || value === undefined || typeof value !== "object") {
      return null;
    }
    if ("Map" in value) {
      const entry = value.Map.find((v: [any, any]) => convertCborValue(v[0]) === part);
      if (!entry) {
        return null;
      }
      value = entry[1];
      continue;
    }

    if ("Array" in value) {
      const index = Number(part);
      if (!Number.isInteger(index) || index < 0 || index >= value.Array.length) {
        return null;
      }
      value = value.Array[index];
      continue;
    }

    return null;
  }
  return convertCborValue(value);
}

export function convertCborValue(value: any): any {
  if (value === null || value === undefined || typeof value !== "object") {
    return value;
  }
  if ("Null" in value) {
    return null;
  }
  if ("Map" in value) {
    const result = {} as { [key: string]: any };
    for (const [key, val] of value.Map) {
      result[convertCborValue(key) as string] = convertCborValue(val);
    }
    return result;
  }
  if ("Tag" in value) {
    const tagPayload = value.Tag[1];
    const bytes =
      tagPayload && typeof tagPayload === "object" && "Bytes" in tagPayload
        ? tagPayload.Bytes
        : tagPayload;
    return convertTaggedValueToString(value.Tag[0], bytes);
  }
  if ("Text" in value) {
    return value.Text;
  }
  if ("Bytes" in value) {
    return value.Bytes;
  }

  if ("Array" in value) {
    return value.Array.map(convertCborValue);
  }
  if ("Integer" in value) {
    return value.Integer;
  }
  if ("Int" in value) {
    return value.Int;
  }
  if ("Float" in value) {
    return value.Float;
  }
  if ("Bool" in value) {
    return value.Bool;
  }
  return value;
}

function bytesToAddressString(type: string, tag: ArrayLike<number>): string {
  const hex = Array.from(tag, function(byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");

  return `${type}_${hex}`;
}

export function convertTaggedValueToString(tag: number, value: any): string | any {
  switch (tag) {
    case BinaryTag.VaultId:
      return bytesToAddressString("vault", value);
    case BinaryTag.ComponentAddress:
      return bytesToAddressString("component", value);
    case BinaryTag.ResourceAddress:
      return bytesToAddressString("resource", value);
    default:
      return value;
  }
}

enum BinaryTag {
  ComponentAddress = 128,
  Metadata = 129,
  NonFungibleAddress = 130,
  ResourceAddress = 131,
  VaultId = 132,
  TransactionReceipt = 134,
  FeeClaim = 135,
}
