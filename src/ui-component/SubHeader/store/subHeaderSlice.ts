import { StateCreator } from 'zustand/esm';
import { SubHeaderData } from '../../../utils/types';

export type SubHeaderSlice = {
  subHeader: SubHeaderData;
  setCommentCount: (value:number) => void;
  setSubHeader: (value: SubHeaderData) => void;
};
const defaultState = {
  subHeader: {
    showSubHeader: false,
    commentsCount:0
  }
}

// creates a sub Header store  for zustand state manager
export const createSubHeaderSlice: StateCreator<SubHeaderSlice> = (set) => ({
  ...defaultState
 ,
  setSubHeader: (value: SubHeaderData) => set(() => ({ subHeader: value })),
  setCommentCount: (newCommentCount:number) =>
    set(() => ({ subHeader: {commentsCount:newCommentCount} })),
});
