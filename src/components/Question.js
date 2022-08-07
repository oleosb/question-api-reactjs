import styles from './Question.module.css';

const Question = ({ id, question, answers, onChange }) => {
  return (
    <fieldset className={styles.question}>
      <legend>{question}</legend>
      {answers.map((answer, idx) => (
        <label className={styles.answer} key={idx} htmlFor={id + idx}>
          <input type="radio" id={id + idx} name={id} value={answer} onChange={onChange}/>
          {answer}
        </label>
      ))}
    </fieldset>
  );
};

export default Question;
