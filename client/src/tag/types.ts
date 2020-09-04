import * as React from 'react';

export type Tag = {
  id: string;
  parentId: string;
  name: string;
  value: string;
};

export type TagsByIdMap = { [key: string]: Tag };
