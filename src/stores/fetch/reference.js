import { defineStore } from 'pinia'

export const useReferenceFetchResult = defineStore('reference', {
    state: () => {
          return {
                fetchBrandResult: [],
                fetchCityResult: [],
                fetchCompanyResult: [],
                fetchEmployeeResult: [],
                fetchIndividualEmployeeResult: [],
                fetchFlightClassResult: [],
                fetchGLAccountResult: [],
                fetchHotelResult: [],
                fetchJobBandResult: [],
                fetchTypeOfHotelResult: [],
                fetchSiteResult: [],
                fetchVendorAirlinesResult: [],
                fetchZonaIdResult: [],
            }
    }
})