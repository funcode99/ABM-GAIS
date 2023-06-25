import { defineStore } from 'pinia'

export const useReferenceFetchResult = defineStore('reference', {
    state: () => {
          return {
                fetchBrandResult: [],
                fetchCityResult: [],
                fetchCompanyResult: [],
                fetchEmployeeResult: [],
                fetchEmployeeByLoginResult: [],
                fetchIndividualEmployeeResult: [],
                fetchRegisterEmployeeResult: [],
                fetchFlightClassResult: [],
                fetchGLAccountResult: [],
                fetchHotelResult: [],
                fetchJobBandResult: [],
                fetchTypeOfHotelResult: [],
                fetchSiteResult: [],
                fetchVendorAirlinesResult: [],
                fetchZonaIdResult: [],
                fetchGrupCompanyResult:[],
            }
    }
})