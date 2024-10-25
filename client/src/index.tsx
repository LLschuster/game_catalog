
import { createRoot } from 'react-dom/client';
import {GameCatalog} from './components/GameCatalog'

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const body = document.getElementById('app') as HTMLElement
const root = createRoot(body);
root.render(<GameCatalog />);
