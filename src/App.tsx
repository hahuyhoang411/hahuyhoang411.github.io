import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router";
import DesktopShell from "@/components/desktop/DesktopShell";

const App = () => (
	<HelmetProvider>
		<BrowserRouter>
			<DesktopShell />
		</BrowserRouter>
	</HelmetProvider>
);
export default App;
