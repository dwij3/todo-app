import styles from './App.module.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className={styles.App}>
      <Header title={"todos"}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
