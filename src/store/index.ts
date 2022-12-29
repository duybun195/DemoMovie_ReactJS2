import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { configReducer } from "services/configService"
import { createBrowserHistory } from "history"
import * as localforage from "localforage"
import { createLogger } from "redux-logger"
import { PersistConfig, persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"
import { authReducer, loginApi } from "services/authService"
import { layoutReducer } from "services/layoutService"
import { userApi } from "services/userServices"
import { movieApi, movieReducer } from "services/movieService"

const rootReducer = (history: History | any) =>
  combineReducers({
    layout: layoutReducer,
    config: configReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    movies: movieReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  })

const apiMidlewares = [loginApi.middleware, userApi.middleware, movieApi.middleware]

const persistConfig: PersistConfig<any> = {
  key: "root",
  version: 1,
  storage: localforage,
  whitelist: ["auth", "config"],
}

const logger = (createLogger as any)()
const history = createBrowserHistory()

const dev = process.env.NODE_ENV === "development"
let middleware = dev ? [thunk, logger] : [thunk]

const persistedReducer = persistReducer(persistConfig, rootReducer(history))
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiMidlewares).concat(middleware),
})
const persistor = persistStore(store)

export { history }
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const configureAppStore = { store, persistor }
export default configureAppStore
