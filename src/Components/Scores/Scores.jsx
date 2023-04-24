import React, { useState, useEffect } from 'react';
import axios from "../../utilities/axios";
import Loader from '../Loader/Loader';

import "./scores.css";

const HIGH_SCORES_URL = "/stats/fetchScores";

const Scores = ({ 
  typingDifficulty, 
  typingDuration,
  selectedArrayName
}) => {
  
  const [ allLevelData, setAllScoreData ] = useState([]);
  const [ selectedLevelData, setSelectedLevelData ] = useState([]);
  const [ loadingData, setLoadingData ] = useState(true);

  // Effect: on render, fetch all highscore data from the DB.
  useEffect(() => {
    const fetchScoreData = async() => {
      let response = await axios.get(HIGH_SCORES_URL);
      console.log(response.data);
      setAllScoreData(response.data);
    }

    if (loadingData) fetchScoreData();
  }, [loadingData])

  // Effect: on change of level settings, modify selectedLevelData with filtered data.
  useEffect(() => {
    let levelName = `${typingDifficulty.toLowerCase()}_${typingDuration}`
    const levelScores = allLevelData?.filter(item => item.level === levelName);
    levelScores[0] ? setSelectedLevelData(levelScores[0].highScores) : setSelectedLevelData(null);
    setLoadingData(false)
  }, [allLevelData, typingDifficulty, typingDuration])


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

        {loadingData 
          ? 
            <Loader />
          : 
            <table className="scores-table">
              {selectedLevelData && 
              <tbody>
                <tr>
                  <th className="score-col col-key">
                    Username
                  </th>
                  <th className="score-col col-key">
                    WPM
                  </th>
                  <th className="score-col col-key">
                    Accuracy
                  </th>
                </tr>
              
                {selectedLevelData?.map((score, index) => {
                  return (
                    <tr key={index}>
                      <td className="score-col">
                        { score.username }
                      </td>
                      <td className="score-col">
                        { score.words_per_minute }
                      </td>
                      <td className="score-col">
                        { score.accuracy }
                      </td>
                    </tr>
                  )
                })}

              </tbody>
              }
              {!selectedLevelData &&
                <tbody> 
                  <tr>
                    <td className='scores-table-empty'>
                      No Scores recorded for this level yet. 
                    </td>
                  </tr>
                </tbody>
              }
            </table>
        }
      </div>
    </div>
  );
};

export default Scores;