import { proxy } from "valtio";

const globalStore = proxy({
  menuOpen: false,
  // theme: "customDarkTheme", // Set initial theme value
  toggleMenu: () => {
    globalStore.menuOpen = !globalStore.menuOpen;
  },
});

export default globalStore;
