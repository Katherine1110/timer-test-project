import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import styles from './Timer.module.css';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    const subject$ = new Subject();
    const timeInterval = interval(1000);

    timeInterval.pipe(takeUntil(subject$)).subscribe(() => {
      if (status === 'start') {
        setSeconds(value => value + 1000);
      }
    });
    return () => {
      subject$.next();
      subject$.complete();
    };
  }, [status]);

  const start = () => {
    setStatus('start');
    setSeconds(0);
  };

  const stop = () => {
    setStatus('stop');
    setSeconds(0);
  };

  const reset = () => {
    setStatus('reset');
    setSeconds(0);
    setStatus('start');
  };

  const wait = () => {
    setStatus('wait');
    setStatus('stop');
  };

  return (
    <div className={styles.container}>
      <span className={styles.timer}>
        {' '}
        {new Date(seconds).toISOString().slice(11, 19)}
      </span>
      <div className={styles.btn_container}>
        <button className={styles.start_button} onClick={start}>
          Start
        </button>
        <button className={styles.stop_button} onClick={stop}>
          Stop
        </button>
        <button className={styles.reset_button} onClick={reset}>
          Reset
        </button>
        <button className={styles.wait_button} onClick={wait}>
          Wait
        </button>
      </div>
    </div>
  );
}

export default Timer;
