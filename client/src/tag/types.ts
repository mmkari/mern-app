import * as React from 'react';

export type Tag = {
  id: string;
  parentId: string;
  name: string;
  value: string;
};
export type TagNode = {
  id: string;
  parentId: string;
  name: string;
  value: string;
  children?: TagNode[];
};

export type TagsByIdMap = { [key: string]: Tag };

export type TagOption = { value: string; label: string };
