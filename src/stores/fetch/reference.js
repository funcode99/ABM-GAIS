import { defineStore } from 'pinia'

export const useReferenceFetchResult = defineStore('reference', {
    state: () => {
          return {
                fetchBrandResult: [],
                fetchCityResult: [],
                fetchCompanyResult: [],
                fetchEmployeeResult: [],
                fetchIndividualEmployeeResult: [],
                fetchGLAccountResult: [],
                fetchHotelResult: [],
                fetchTypeOfHotelResult: [],
                fetchSiteResult: [],
                fetchVendorAirlinesResult: [],
                fetchZonaIdResult: [],
            }
    }
})