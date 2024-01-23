'use client'

import {create} from 'zustand';

type State = {
  stepIndex: number;
  setStepIndex: (value: number) => void;
};

export const useStepStore = create<State>((set) => ({
  stepIndex: 0,
  setStepIndex: (valueType:number) => set(() => ({ stepIndex: valueType })),
}));
