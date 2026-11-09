import GlobalStyle from './GlobalStyle';
import Header from './Header';
import AboutMe from './AboutMe';
import MyProjects from './MyProjects';
import Footer from './Footer';
import Comments from './Comments';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
      <AboutMe />
      <MyProjects />
      <Comments />
      </main>
      <Footer />
    </>
  );
}

export default App;