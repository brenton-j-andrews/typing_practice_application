import React, { useEffect, useState } from 'react';

import Loader from '../Loader/Loader';

import "./scores.css";

const Scores = ({ 
  typingDifficulty, 
  typingDuration,
  selectedArrayName
}) => {

  const [ loadingData, setLoadingData ] = useState(false);

  const dummyData = [{ "Brent" : [59, 96]}, { "Bruce" : [62, 94]}, { "Bruce" : [62, 94]}, { "Bruce" : [62, 94]}, { "Bruce" : [62, 94]}];

  const setTableTitle = () => {
    if (selectedArrayName) {
      return selectedArrayName;
    }
    else {
      let minuteString = typingDuration === 1 ? `${typingDuration} minute` : `${typingDuration} minutes`;
      return `${typingDifficulty} - ${minuteString}`;
    }
  }

  return (
    <div className='scores-wrapper'>
      
      <h3 className='scores-header'> High Scores: </h3>

      <div className="scores-table-wrapper">
        
        <span className='scores-table-label'> 
          {setTableTitle()}
        </span>

        <div className="scores-table">
          {loadingData 
            ? 
              <Loader />
            : 
            <>
              <div className="score-row">
                <div className="score-col col-key">
                  Username
                </div>
                <div className="score-col col-key">
                  WPM
                </div>
                <div className="score-col col-key">
                  Accuracy
                </div>
              </div>

              {dummyData.map((score, index) => {
                let name = Object.keys(score);
                let stats = Object.values(score)[0];
                
                return (
                  <div className="score-row" key={index}>
                    <div className="score-col">
                      { name}
                    </div>
                    <div className="score-col">
                      { stats[0]}
                    </div>
                    <div className="score-col">
                      { stats[1]}%
                    </div>
                  </div>
                )
              })}
            </>
            
          }

        </div>
      </div>
    </div>
  );
};

export default Scores;