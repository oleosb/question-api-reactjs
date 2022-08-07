import styles from './App.module.css';
import { useState, useEffect } from 'react';
import QuestionsList from './components/QuestionsList';
import { nanoid } from 'nanoid';
import { FaChevronDown } from 'react-icons/fa';

const App = () => {
  const [questions, setQuestions] = useState('');
  const [answers, setAnswers] = useState([]);
  const [amount, setAmount] = useState('2');
  const [category, setCategory] = useState('Categories');
  const [url, setUrl] = useState(
    `https://opentdb.com/api.php?amount=${amount}&type=multiple`,
  );
  const [result, setResult] = useState('');
  const getQuestions = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();

    const results = responseJson.results;
    results.map((result) => {
      delete result.type;
      result.id = nanoid();
      result.answers = [result.correct_answer].concat(result.incorrect_answers);
      result.answers = result.answers.sort(() => Math.random() - 0.5);
      delete result.incorrect_answers;
      return results;
    });
    if (results) {
      setResult('');
      setAnswers([]);
      setQuestions(results);
    }
  };

  const handleAnswers = ({ target }) => {
    setAnswers({ ...answers, [target.name]: target.value });
  };

  const handleResult = () => {
    const corrects = questions.filter(
      ({ id, correct_answer }) => answers[id] === correct_answer,
    );
    setResult(`Você acertou ${corrects.length} de ${questions.length}.`);
  };

  const handleAmount = ({ target }) => {
    setAmount(target.value);
  };

  const handleCategory = ({ target }) => {
    setCategory(target.innerText);
  };

  useEffect(() => {
    switch (category) {
      case 'Any Category':
      case 'Categories':
        setUrl(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
        break;
      case 'General Knowledge':
        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=9&type=multiple`,
        );
        break;
      case 'Animals':
        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=27&type=multiple`,
        );
        break;
      case 'Sports':
        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=21&type=multiple`,
        );
        break;
      case 'Politics':
        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=24&type=multiple`,
        );
        break;
      case 'Celebrities':
        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=26&type=multiple`,
        );
        break;
      default:
        setUrl(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
    }
  }, [category, amount]);

  return (
    <section>
      <nav className={styles.navFilter}>
        <label htmlFor="nq">
          Number of Questions:
          <input
            className={styles.amountInpt}
            type="number"
            onChange={handleAmount}
            value={amount}
            min={1}
            id="nq"
          />
        </label>
        <ul className={styles.cat1}>
          <li>
            {category ? category : 'Category'}
            <FaChevronDown className={styles.arrowDown} />
          </li>
          <ul className={styles.cat2}>
            <li onClick={handleCategory}>Any Category</li>
            <li onClick={handleCategory}>General Knowledge</li>
            <li onClick={handleCategory}>Animals</li>
            <li onClick={handleCategory}>Sports</li>
            <li onClick={handleCategory}>Politics</li>
            <li onClick={handleCategory}>Celebrities</li>
          </ul>
        </ul>
        <button className={styles.btn} onClick={getQuestions}>apply</button>
      </nav>
      {questions && !result && (
        <QuestionsList
          questions={questions}
          onChange={handleAnswers}
          onClick={handleResult}
        />
      )}
      {result && result}
    </section>
  );
};

export default App;
