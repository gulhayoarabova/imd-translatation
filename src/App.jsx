/** @format */

import './App.css';
import DefaultRouterProvider from './routes/index.jsx';
function App() {
   
    // if (userStatus === 'loading') return <p>Loading...</p>;
    // if (userStatus === 'failed') return <p>Error: {userError}</p>;

    return (
        <>
            <DefaultRouterProvider />
        </>
    );
}
export default App;
