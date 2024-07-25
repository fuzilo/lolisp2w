import { defineStore } from 'pinia'

/**
 * Store for managing skins data.
 * @typedef {Object} Skin
 * @property {string} name - The name of the skin.
 * @property {string} champion - The champion associated with the skin.
 * @property {string} theme - The theme of the skin.
 * @property {Date} releaseDate - The release date of the skin.
 * @property {number} price - The price of the skin.
 * @property {string} rarity - The rarity of the skin.
 */

export const useSkinsStore = defineStore('skins', {
 state: () => ({
  /** @type {Skin[]} */
  skins: [],
  selectedSkin: null
 }),
 getters: {
  /**
   * Get a skin by its ID.
   * @param {string} id - The ID of the skin.
   * @returns {Skin|undefined} The skin with the specified ID, or undefined if not found.
   */
  getSkinById: (state) => (id) => {
   return state.skins.find((skin) => skin._id === id)
  },
  /**
   * Get all skins associated with a champion.
   * @param {string} champion - The champion name.
   * @returns {Skin[]} The skins associated with the specified champion.
   */
  getSkinsByChampion: (state) => (champion) => {
   return state.skins.filter((skin) => skin.champion === champion)
  },
  /**
   * Get all skins.
   * @returns {Skin[]} All skins.
   */
  getAllSkins: (state) => {
   return state.skins
  }
 },
 actions: {
  /**
   * Set skins data.
   */
  setSkins(skins) {
   this.skins = skins
  },
  /**
   * Set the selected skin.
   */
  setSelectedSkin(skin) {
    this.selectedSkin = skin
  }
 }
})
