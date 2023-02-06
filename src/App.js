import React, { Component } from 'react';
import './App.css';

import quizQuestions from './API/quizQuestions';
import QuestionCount from './components/QuestionCount';
import Header from './components/Header';
import ResultPage from './components/ResultPage';
import Question from './components/Question';
import AnswerOptions from './components/AnswerOptions';
import PreviousButton from './components/PreviousButton';
import NextButton from './components/NextButton';
import SubmitButton from './components/SubmitButton';
import CountdownTimer from './components/CountdownTimer';
import QuestionList from './components/QuestionList';


class QuizApp extends Component {
  constructor() {
    super();
    const arr = []
    const Qlist = []
    for (let i = 0; i < quizQuestions.length; i++) {
      arr.push('')
      Qlist.push({ question: `Q${i}`, status: `Not Answered` })
    }
    this.state = {
      header: quizQuestions[0].courseName,
      questionCounter: 0,
      questionId: 1,
      questions: quizQuestions,
      answerOptions: quizQuestions["answers"],
      givenAnswers: arr,
      correctAnswer: '',
      questionScore: quizQuestions["questionScore"],
      totalScore: arr,
      quizStatus: '',
      totalMins: 15 * 60 * 1000, //15 minutes,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeUp: false,
      startingTime: new Date().getTime(),
      questionList: Qlist
    }
    this.totalPoScore = this.calculateTotalPoScore.bind(this)
    this.onAnswerClick = this.onAnswerClick.bind(this)
    this.handlePrevButton = this.handlePrevButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
  }

  calculateTotalPoScore(quizQuestions) {
    var total = 0
    for (var i = 1; i <= quizQuestions.length; i++) {
      total += quizQuestions[i - 1].questionScore
    }
    return total
  }

  componentDidMount() {
    this.setState({
      quizStatus: this.state.questionCounter === quizQuestions.length ? 'finished' : 'active'
    })

    setInterval(() => {
      let difference = this.state.startingTime + this.state.totalMins - new Date();
      if (difference < 1) {
        this.setState({ timeUp: true });
        this.setState(state => {
          const totalScore = state.givenAnswers.map((item, j) => {
            if (item === quizQuestions[j]["correctAnswer"]) {
              return quizQuestions[j]["questionScore"]
            } else {
              return 0
            }
          });

          return {
            totalScore,
            quizStatus: 'finished',
          };
        });
        this.setState(state => {
          const givenAnswers = state.givenAnswers.map((item, j) => {
            if (j === this.state.questionCounter) {
              return this.state.selectedOption;
            } else {
              return item;
            }
          });

          return {
            selectedOption:
              this.state.givenAnswers[this.state.questionCounter + 1] !== ''
                ? this.state.givenAnswers[this.state.questionCounter + 1]
                : '',
            givenAnswers,
          };
        });
      } else {
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / (1000 * 60)) % 60);
        let seconds = Math.floor((difference / (1000)) % 60);
        this.setState({
          hours: hours > 9 ? hours : `0${hours}`,
          minutes: minutes > 9 ? minutes : `0${minutes}`,
          seconds: seconds > 9 ? seconds : `0${seconds}`
        });
      }
    }, 1000)

  }


  onAnswerClick(content) {
    this.setState({
      selectedOption: content
    });

  }


  handlePrevButton() {
    this.setState(state => {
      const givenAnswers = state.givenAnswers.map((item, j) => {
        if (j === this.state.questionCounter) {
          return this.state.selectedOption;
        } else {
          return item;
        }
      });

      return {
        selectedOption:
          this.state.givenAnswers[this.state.questionCounter - 1] !== ''
            ? this.state.givenAnswers[this.state.questionCounter - 1]
            : '',
        givenAnswers,
        questionCounter: this.state.questionCounter - 1,
      };
    });
  }

  handleNextButton() {
    this.setState(state => {
      const givenAnswers = state.givenAnswers.map((item, j) => {
        if (j === this.state.questionCounter) {
          return this.state.selectedOption;
        } else {
          return item;
        }
      });

      return {
        selectedOption:
          this.state.givenAnswers[this.state.questionCounter + 1] !== ''
            ? this.state.givenAnswers[this.state.questionCounter + 1]
            : '',
        givenAnswers,
        questionCounter: this.state.questionCounter + 1,
      };
    });
  }

  handleSubmitButton() {
    this.setState(state => {
      const givenAnswers = state.givenAnswers.map((item, j) => {
        if (j === this.state.questionCounter) {
          return this.state.selectedOption;
        } else {
          return item;
        }
      });

      return {
        selectedOption:
          this.state.givenAnswers[this.state.questionCounter - 1] !== ''
            ? this.state.givenAnswers[this.state.questionCounter - 1]
            : '',
        givenAnswers,
      };
    });
    this.setState(state => {
      const totalScore = state.givenAnswers.map((item, j) => {
        if (item === quizQuestions[j]["correctAnswer"]) {
          return quizQuestions[j]["questionScore"]
        } else {
          return 0
        }
      });

      return {
        totalScore,
        quizStatus: 'finished',
      };
    });
  }

  render() {
    console.log(this.state.questionList)
    return (
      <div className="quiz-app">
        {this.state.quizStatus === 'active' && !this.state.timeUp ? (
          <div className='body'>
            <Header header={this.state.header} />
            <div className='rowC'>
              <QuestionCount
                counter={this.state.questionCounter + 1}
                totalCount={quizQuestions.length}
              />
              <div key={this.state.questionId} className='container'>
                <div className='question-options'>
                  <Question
                    questionId={this.state.questionId}
                    questions={this.state.questions}
                    counter={this.state.questionCounter}
                  />
                  <ul className="answerOptions">
                    {this.state.questions[this.state.questionCounter]["answers"].map(answer => (
                      <AnswerOptions
                        key={answer}
                        answerContent={answer}
                        questionId={this.state.questionId}
                        givenAnswers={this.state.givenAnswers}
                        correctAnswer={this.state.correctAnswer}
                        onClick={this.onAnswerClick}
                        counter={this.state.questionCounter}
                        qScore={this.state.questionScore}
                        selectedOption={this.state.selectedOption}
                      />
                    ))}
                  </ul>
                </div>
                <div className="button-container">
                  <PreviousButton
                    onClick={this.handlePrevButton}
                    counter={this.state.questionCounter}
                  />
                  {this.state.questionCounter + 1 === quizQuestions.length ? (
                    <SubmitButton
                      onClick={this.handleSubmitButton}
                    />
                  ) : (
                    <NextButton
                      onClick={this.handleNextButton}
                      counter={this.state.questionCounter}
                      totalQuestion={quizQuestions.length}
                    />
                  )}
                </div>
              </div>
              <div className='rowD'>
                <div className='time-left'>Time Left</div>
                <CountdownTimer
                  hours={this.state.hours}
                  minutes={this.state.minutes}
                  seconds={this.state.seconds}
                />
                <div className='rowE'>
                  <QuestionList
                    counter={this.state.questionCounter}
                    qList={this.state.questionList}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Header header={this.state.header} />
            <ResultPage
              score={this.state.totalScore}
              totalscore={this.calculateTotalPoScore(quizQuestions)}
              isTimeUp={this.state.timeUp}
            />
          </div>
        )
        }
      </div>
    )
  }

}

export default QuizApp;
