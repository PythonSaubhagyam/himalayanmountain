import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";



export const initializeAppData = createAsyncThunk("app/initializeData", async (_, { rejectWithValue }) => {
  try {
    const [
      bannersResponse,
      upperSectionResponse,
      tryOurNewProductResponse,
      mustTryResponse,
      allTimeBestSellerResponse,
      lowerSectionResponse,
      blogsResponse,
      statisticsResponse,
      lowerMostSectionResponse,
      skinSectionResponse
    ] = await Promise.all([
      client.get("/ecommerce/banners/?sequence=Upper"),
      client.get("/himalayanmountain-section/?type=upper"),
      client.get("/newarrival/list"),
      client.get("/musttry/list"),
      client.get("/bestofalltime/list"),
      client.get("/himalayanmountain-section/?type=lower"),
      client.get("/home/blogs/"),
      client.get("/statistics-section/"),
      client.get("/lower-section/"),
      client.get("/himalayanmountain-section/?type=product"),
    ]);

    return {
      banners: bannersResponse.data.banner || [],
      upperSection: upperSectionResponse.data.data || [],
      newArrival: tryOurNewProductResponse.data.data || [],
      mustTry: mustTryResponse.data.data || [],
      bestSeller: allTimeBestSellerResponse.data.data || [],
      lowerSection: lowerSectionResponse.data.data || [],
      blogs: blogsResponse.data.blogs || [],
      statistics: statisticsResponse.data.data || {},
      lowerMostSection: lowerMostSectionResponse.data.data || [],
      skinSection: skinSectionResponse.data.data || [],
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const initialState = {
  banners: [],
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
  hasFetched: false,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAppData.pending, (state) => {
        state.loader = true
      })
      .addCase(initializeAppData.fulfilled, (state, action) => {
        state.loader = false;
        const {
          banners,
          upperSection,
          newArrival,
          mustTry,
          bestSeller,
          lowerSection,
          blogs,
          statistics,
          lowerMostSection,
          skinSection,
        } = action.payload;
        state.hasFetched = true;
        state.banners = banners;
        state.bestSeller = bestSeller;
        state.blogs = blogs;
        state.mustTry = mustTry;
        state.newArrival = newArrival;
        state.statistics = statistics;
        state.upperSection = {
          aboutSection: upperSection.filter((section) => section.id === 1),
          certificateSection: upperSection.filter((section) => section.id === 2),
        };
        state.skinSection = {
          glowingSkinSection: skinSection.filter((section) => section.id === 3),
          featuredProductsSection: skinSection.filter((section) => section.id === 4),
          appleCiderSection: skinSection.filter((section) => section.id === 6),
        };
        state.lowerSection = {
          ethicalTeaSection: lowerSection.filter((section) => section.id === 5),
          cupOfTeaSection: lowerSection.filter((section) => section.id === 7),
          informativeSection: lowerSection.filter((section) => section.id === 8),
          licencesSection: lowerSection.filter((section) => section.id === 9),
          nonGMOSection: lowerSection.filter((section) => section.id === 10),
        };
        state.lowerMostSection = {
          awardsSection: lowerMostSection.filter((section) => section.id === 1),
          servicesSection: lowerMostSection.filter((section) => section.id === 2),
          availableSection: lowerMostSection.filter((section) => section.id === 3),
        };

      })
      .addCase(initializeAppData.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })
  },
});

export default bannerSlice.reducer;
