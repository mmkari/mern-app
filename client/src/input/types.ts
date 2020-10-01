import * as React from 'react';

export type SelectOption = { value: string | number; label: string };

export type InputValue = boolean | number | string | SelectOption | null;

export type OnChangeFunction = (name: string, value: InputValue) => void;
