import React, { useEffect } from "react";
import { useState } from "react";
import { dateArray, strategyArray } from "../data";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Main = () => {
  const strategyName = ["Bullish", "Bearish", "RangeBound", "Volatile"];
  const [isActive, setActive] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [date, setDate] = useState(dateArray[0]);
  const [dateValues, setDateValues] = useState({});
  const [activeName, setActiveName] = useState(strategyName[0]);

  useEffect(() => {
    renderData(activeName, date);
  }, [date, activeName]);

  const expandValues = (index) => {
    setActive(index === isActive ? 0 : index);
    setActiveName(strategyName[index]);
  };
  const IcontoggleState = () => {
    setIsToggled((prevState) => !prevState);
  };
  const selecteDate = (index) => {
    setDate(dateArray[index]);
    setIsToggled(false);
  };

  const renderData = (activeName, date) => {
    let sortedKeys = {};
    let myMatch;
    for (let i = 0; i < strategyArray.length; i++) {
      if (strategyArray[i].View === activeName) {
        for (let key in strategyArray[i].Value) {
          if (key === date) {
            myMatch = strategyArray[i].Value[key];
            break;
          }
        }
        break;
      }
    }
    myMatch?.forEach((item) => {
      sortedKeys[item] = (sortedKeys[item] || 0) + 1;
    });
    setDateValues(sortedKeys);
  };

  return (
    <>
      <div className="parent-div">
        <div className="heading-div">
          {strategyName.map((singleStategy, index) => {
            return (
              <div
                className={`heading-div-${singleStategy.toLowerCase()} ${
                  isActive === index ? "highlight-color" : ""
                }`}
                key={index}
                onClick={() => expandValues(index)}
              >
                {singleStategy}
              </div>
            );
          })}
        </div>
        <div className="date-div">
          <span className="date">{date.replaceAll("-", " ")}</span>
          <span className="icon" onClick={IcontoggleState}>
            {/* <img alt="icon" src="../assets/dropDownIcon.svg" /> */}
            {isToggled ? <FaChevronUp /> : <FaChevronDown />}
            {/* <RiArrowRightSLine /> */}
          </span>
        </div>
        {isToggled ? (
          <>
            <div className="parent-dropdown-div">
              {dateArray.map((singleDate, index) => {
                return (
                  <>
                    <div
                      className="parent-dropdown-subdiv"
                      key={index}
                      onClick={() => selecteDate(index)}
                    >
                      <span className="date">
                        {singleDate.replaceAll("-", " ")}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div></div>
        )}
        {Object.keys(dateValues).length ? (
          Object.keys(dateValues).map((key, index) => {
            return (
              <div className="studies-name">
                <span className="date">{key}</span>
                <span className="strategy-count">
                  {dateValues[key] > 1
                    ? `• ${dateValues[key]} strategies`
                    : `• ${dateValues[key]} strategy`}
                </span>
              </div>
            );
          })
        ) : (
          <div className="note-div">
            <span className="node-divwarning">{`There is no Strategies for`}</span>
            <span className="note-divdate">{`${date.replaceAll(
              "-",
              " "
            )}`}</span>
          </div>
        )}
      </div>
    </>
  );
};
