import GlobalStyle from './GlobalStyle';
import Header from './Header';
import AboutMe from './AboutMe';
import MyProjects from './MyProjects';
import Footer from './Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
      <AboutMe />
      <MyProjects />
      </main>
      <Footer />
    </>
  );
}

export default App;