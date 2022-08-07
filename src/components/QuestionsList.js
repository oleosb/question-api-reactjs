import styles from './QuestionsList.module.css';
import Question from './Question';

const QuestionsList = ({ questions, onChange, onClick }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {questions.map((question, idx) => (
        <Question key={idx} {...question} onChange={onChange} />
      ))}
      <button className={styles.btn} onClick={onClick}>submit</button>
    </form>
  );
};

export default QuestionsList;
