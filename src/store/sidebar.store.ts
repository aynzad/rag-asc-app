import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
}

export const useSidebarStore = create<SidebarState>()(() => ({
  isOpen: true,
}));

// getters
export const useSidebarIsOpen = () => useSidebarStore((state) => state.isOpen);

// actions
export const toggleSidebar = () => {
  useSidebarStore.setState((state) => ({ isOpen: !state.isOpen }));
};
