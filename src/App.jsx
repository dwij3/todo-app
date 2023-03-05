import styles from './App.module.css';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  return (
    <div className={styles.App}>
      <Header heading={"todos"}/>
      <Main />
    </div>
  );
}

export default App;
