'use client'

import { RegisterDataProps } from '@/types/personTypes';
import {create} from 'zustand';

type State = {
  person: RegisterDataProps;
  setPerson: (value:RegisterDataProps) => void;
};

export const usePersonStore = create<State>((set) => ({
  person: {id:0, name:'', email:'', phone:''},
  setPerson: (valueType:RegisterDataProps) => set(() => ({ person: valueType })),
}));
