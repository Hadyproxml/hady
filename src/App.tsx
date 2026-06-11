/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden font-sans">
       <Dashboard />
    </div>
  );
}

