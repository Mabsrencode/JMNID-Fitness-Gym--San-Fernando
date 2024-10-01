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
import Profile from "./pages/private/Profile.jsx";
import MealPlanner from "./pages/private/MealPlanner.jsx";
import WorkoutView from "./pages/private/WorkoutView.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import MealDashboard from "./pages/admin/MealDashboard.jsx";
import WorkoutDashboard from "./pages/admin/WorkoutDashboard.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import Gym from "./pages/public/Gym.jsx";
import MemberLayout from "./Layout/MemberLayout.jsx";
import MyWorkouts from "./pages/private/MyWorkouts.jsx";
import WorkoutPlanner from "./pages/private/WorkoutPlanner.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
            <Route path="gym" element={<Gym />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          {/* member layout */}
          <Route element={<UserProvider />}>
            <Route path="/client" element={<MemberLayout />}>
              {/* Change the nested routes to relative paths */}
              <Route path="profile" element={<Profile />} />
              <Route path="meal-planner" element={<MealPlanner />} />
              <Route path="workout/:_id" element={<WorkoutView />} />
              <Route path="my-workouts" element={<MyWorkouts />} />
              <Route path="workout-planner" element={<WorkoutPlanner />} />
            </Route>
          </Route>
          {/* admin layout */}
          <Route element={<AdminProvider />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Change the nested routes to relative paths */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="meals" element={<MealDashboard />} />
              <Route path="workouts" element={<WorkoutDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
