import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

const initialState = {
  banners: [],
  middleBanners: [],
  lowerBanners: [],
  loader: false,
  error: null,
  upperSection: {
    aboutSection: [],
    certificateSection: [],
  },
  skinSection: {
    glowingSkinSection: [],
    featuredProductsSection: [],
    appleCiderSection: [],
  },
  lowerSection: {
    ethicalTeaSection: [],
    cupOfTeaSection: [],
    informativeSection: [],
    licencesSection: [],
    nonGMOSection: [],
  },
  lowerMostSection: {
    awardsSection: [],
    servicesSection: [],
    availableSection: []
  },
  productSections: {},
  newArrival: [],
  mustTry: [],
  bestSeller: [],
  blogs: [],
  statistics: [],
};

const getResponseData = (response, key) => {
  if (!response || !response.status) return [];
  return response[key] || response.data || [];
};

export const fetchBanners = createAsyncThunk("banners/fetchBanners", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/ecommerce/banners/?sequence=Upper");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchUpperSection = createAsyncThunk("home/fetchUpperSection", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/himalayanmountain-section/?type=upper");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchSkinglowSection = createAsyncThunk("home/fetchSkinglowSection", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/himalayanmountain-section/?type=product");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchLowerSection = createAsyncThunk("home/fetchLowerSection", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/himalayanmountain-section/?type=lower");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchNewarrival = createAsyncThunk("home/fetchNewarrival", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/newarrival/list");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const fetchMusttry = createAsyncThunk("home/fetchMusttry", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/musttry/list");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchBestofalltime = createAsyncThunk("home/fetchBestofalltime", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/bestofalltime/list");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchBlogs = createAsyncThunk("home/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/home/blogs/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchStatistics = createAsyncThunk("home/fetchStatistics", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/statistics-section/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchLower = createAsyncThunk("home/fetchLower", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get("/lower-section/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});


const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.banners = getResponseData(action.payload, "banner");
        }
      })
      .addCase(fetchUpperSection.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          const data = getResponseData(action.payload, "data");
          state.upperSection = {
            aboutSection: data.filter((section) => section.id === 1),
            certificateSection: data.filter((section) => section.id === 2),
          };
        }
      })
      .addCase(fetchSkinglowSection.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          const data = getResponseData(action.payload, "data");
          state.skinSection = {
            glowingSkinSection: data.filter((section) => section.id === 3),
            featuredProductsSection: data.filter((section) => section.id === 4),
            appleCiderSection: data.filter((section) => section.id === 6),
          };
        }
      })
      .addCase(fetchLowerSection.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          const data = getResponseData(action.payload, "data");
          state.lowerSection = {
            ethicalTeaSection: data.filter((section) => section.id === 5),
            cupOfTeaSection: data.filter((section) => section.id === 7),
            informativeSection: data.filter((section) => section.id === 8),
            licencesSection: data.filter((section) => section.id === 9),
            nonGMOSection: data.filter((section) => section.id === 10),
          };
        }
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.blogs = getResponseData(action.payload, "blogs");
        }
      })
      .addCase(fetchNewarrival.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.newArrival = action.payload.data || [];  
        }
      })
      
      .addCase(fetchMusttry.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.mustTry = action.payload.data || [];  
        }
      })
      .addCase(fetchBestofalltime.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.bestSeller = action.payload.data || [];  
        }
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.statisticsSection= action.payload.data || [];  
        }
      })
      .addCase(fetchLower.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          const data = getResponseData(action.payload, "data");
          state.lowerMostSection = {
            awardsSection: data.filter((section) => section.id === 1),
            servicesSection: data.filter((section) => section.id === 2),
            availableSection: data.filter((section) => section.id === 3),
          };
        }
      })
  },
});

export default bannerSlice.reducer;
