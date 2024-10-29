import { Layout } from "@/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  Login,
  DashboardPage,
  PrivateRoute,
  ProfilePage,
  ServerPage,
  ServerForm,
  AccessLog,
  AccessServer,
  StoreLog,
  StoreServer,
  UserAgentLog,
  UserAgentServer,
  CacheLog,
  CacheServer,
  SocketPage,
} from "@/pages";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                {/* Monitoring Access Log */}
                <Route path="/access" element={<AccessLog />} />
                <Route path="/access/server" element={<AccessServer />} />

                {/* Monitoring Store Log */}
                <Route path="/store" element={<StoreLog />} />
                <Route path="/store/server" element={<StoreServer />} />

                {/* Monitoring UserAgent Log */}
                <Route path="/useragent" element={<UserAgentLog />} />
                <Route path="/useragent/server" element={<UserAgentServer />} />

                {/* Monitoring Cache Log */}
                <Route path="/cache" element={<CacheLog />} />
                <Route path="/cache/server" element={<CacheServer />} />

                {/* Profile */}
                <Route path="/profile" element={<ProfilePage />} />

                {/* Server */}
                <Route path="/server" element={<ServerPage />} />
                <Route path="/server/form" element={<ServerForm />} />
                <Route path="/server/form/:id" element={<ServerForm />} />

                {/* Socket */}
                <Route path="/socket" element={<SocketPage />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Fragment>
  )
}