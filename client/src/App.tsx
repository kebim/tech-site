/** Industrial Field Manual design reminder: routes are intentionally short and correspond to the two editable sites. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import TechPage from "./pages/TechPage";
import InfoPage from "./pages/InfoPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/tech" component={TechPage} />
      <Route path="/about" component={InfoPage} />
      <Route path="/contact" component={InfoPage} />
      <Route path="/privacy" component={InfoPage} />
      <Route path="/terms" component={InfoPage} />
      <Route path="/editorial" component={InfoPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
