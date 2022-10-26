import React, { useState } from 'react';
import Section from './Section/Section';
import ButtonsDiv from './ButtonsDiv/ButtonsDiv';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import { GlobalStyle } from './GlobalStyle/GlobalStyle.styled';

export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const incrementActionState = action => {
    setState(prevState => {
      return { ...state, [action]: prevState[action] + 1 };
    });
  };

  const countTotalFeedback = () =>
    Object.values(state).reduce((acc, curr) => acc + curr, 0);

  const countPositiveFeedbackPercentage = () =>
    Math.round((state.good * 100) / countTotalFeedback());

  return (
    <>
      <GlobalStyle />
      <Section title="Please live feedback">
        <ButtonsDiv
          actions={Object.keys(state)}
          onClick={incrementActionState}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            parms={{
              ...state,
              total: countTotalFeedback(),
              'Positive feedback':
                countPositiveFeedbackPercentage().toString() + '%',
            }}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};
