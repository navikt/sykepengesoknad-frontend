// pages/JobInfo.tsx

import { NextPage } from 'next';
import Head from 'next/head';

const JobInfo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Arbeidsinformasjon</title>
        <meta name="description" content="Informasjon om arbeid underveis i andre arbeidsforhold" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Arbeid underveis i andre arbeidsforhold</h1>
        <p>
          Har du jobbet noe i andre arbeidsorhold i perioden 5 september til 11 oktober? Vi har lagt inn andre jobber du har vi kjenner til.
        </p>
        <ul>
          {/* Eksempel element 1 */}
          <li>
            <span>Bakeren ved parken</span> <br />
            <input type="checkbox" id="ikkeJobbet1" name="ikkeJobbet1" />
            <label htmlFor="ikkeJobbet1">ikke jobbet der i perioden</label> <br />
            <label htmlFor="timer1">Timer jobbet:</label>
            <input type="text" id="timer1" name="timer1" placeholder="F.eks: 5 timer" />
            <label htmlFor="lønn1">Lønn tjent:</label>
            <input type="text" id="lønn1" name="lønn1" placeholder="F.eks: 200 kr" />
          </li>
          {/* Eksempel element 2 */}
          <li>
            <span>Barnehagen i det gule huset</span><br />
            <input type="checkbox" id="ikkeJobbet2" name="ikkeJobbet2" />
            <label htmlFor="ikkeJobbet2">ikke jobbet der i perioden</label> <br />
            <label htmlFor="timer2">Timer jobbet:</label>
            <input type="text" id="timer2" name="timer2" placeholder="F.eks: 8 timer" />
            <label htmlFor="lønn2">Lønn tjent:</label>
            <input type="text" id="lønn2" name="lønn2" placeholder="F.eks: 320 kr" />
          </li>
          {/* Button to add another job */}
          <li style={{ textAlign: 'left' }}>
            <button>+ legg til en annen jobb</button>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default JobInfo;
