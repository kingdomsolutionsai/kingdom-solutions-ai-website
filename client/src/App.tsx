import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CapacityLeakAudit from "./pages/CapacityLeakAudit";
import ClarityPro from "./pages/ClarityPro";
import Constance from "./pages/Constance";
import ExecutiveAIStrategy from "./pages/ExecutiveAIStrategy";
import Handbook from "@/pages/Handbook";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StrategyCall from "./pages/StrategyCall";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Layout from "./components/Layout";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/capacity-leak-audit" component={CapacityLeakAudit} />
        <Route path="/clarity-pro" component={ClarityPro} />
        <Route path="/constance" component={Constance} />
        <Route path="/executive-ai-strategy" component={ExecutiveAIStrategy} />
        <Route path="/handbook" component={Handbook} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/strategy-call" component={StrategyCall} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/refund-policy" component={RefundPolicy} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
