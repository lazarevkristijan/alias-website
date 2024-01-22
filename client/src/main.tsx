import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { store } from "./Store.ts"
import { Auth0Provider } from "@auth0/auth0-react"

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain="alias-group.eu.auth0.com"
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{ redirect_uri: window.location.origin }}
        >
          <App />
        </Auth0Provider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
