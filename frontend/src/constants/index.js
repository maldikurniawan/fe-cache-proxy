const host = "http://localhost:8000";
const api = "/api";

export const baseurl = `${host}${api}`;
export const API_URL_login = `${baseurl}/auth/`;
export const API_URL_updatesuperuser = `${baseurl}/update_data_super_user_id/`;

// Access
export const API_URL_access = `${baseurl}/acceslogview/`;
export const API_URL_accessupdate = `${baseurl}/acceslogupdate/`;
export const API_URL_accessfilter = `${baseurl}/acceslogviewfilter/`;

// Store
export const API_URL_store = `${baseurl}/storelogview/`;
export const API_URL_storeupdate = `${baseurl}/storelogupdate/`;
export const API_URL_storefilter = `${baseurl}/storelogviewfilter/`;

// Useragent
export const API_URL_useragent = `${baseurl}/agentlogview/`;
export const API_URL_useragentupdate = `${baseurl}/agentlogupdate/`;
export const API_URL_useragentfilter = `${baseurl}/agentlogviewfilter/`;

// Cache
export const API_URL_cache = `${baseurl}/cachelogview/`;
export const API_URL_cacheupdate = `${baseurl}/cachelogupdate/`;
export const API_URL_cachefilter = `${baseurl}/cachelogviewfilter/`;

// Server
export const API_URL_getserver = `${baseurl}/servercreate/`;
export const API_URL_edelserver = `${baseurl}/serverupdatedelete/`;
