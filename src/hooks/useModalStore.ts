import { create } from 'zustand';

export type ModalType = 'createClass' | 'addResource';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;

  // eslint-disable-next-line no-unused-vars
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type: type }),
  onClose: () => set({ type: null, isOpen: false })
}));
