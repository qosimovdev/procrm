import { create } from "zustand";

export const useModalStore = create((set) => ({
    modalType: null,
    modalData: null,

    openModal: (type, data = null) =>
        set({
            modalType: type,
            modalData: data,
        }),

    closeModal: () =>
        set({
            modalType: null,
            modalData: null,
        }),
}));