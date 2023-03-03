import styles from './App.module.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';


function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
