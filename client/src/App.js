import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Services from "./pages/public/Services.jsx";
import Contact from "./pages/public/Contact.jsx";
import NoPage from "./pages/public/NoPage.jsx";
import SignIn from "./pages/public/SignIn.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import SignUp from "./pages/public/SignUp.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/gym" element={<Careers />} />
            <Route path="/FAQs" element={<FAQs />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<UserProvider />}>
              <Route path="/services" element={<Services />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          {/* <Route path="/" element={<AdminLayout />}>
            <Route element={<UserProvider />}>
              <Route path="/admin" element={<AdminDashboardViewer />} />
              <Route
                path="/admin-create-account"
                element={<AdminCreateAccount />}
              />
            </Route>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
