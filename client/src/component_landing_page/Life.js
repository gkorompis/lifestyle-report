import React from 'react'
import Health from '../pages/Health';
import Cover from '../pages/Cover';
import TableOfContents from '../pages/TableOfContents';
import GetToKnow from '../pages/GetToKnow';
import Legend from '../pages/Legend';
import Summary from '../pages/Summary';
import Summary2 from '../pages/Summary_pt2';
import Summary3 from '../pages/Summary_pt3';
import Nutrition from '../pages/Nutrition';
import Fitness from '../pages/Fitness';
import Habbit from '../pages/Habbit';
import BookBelongsTo from '../pages/BookBelongsTo';
import EndCover from '../pages/EndCover'

function Life() {
  return (
    <div>
      <Cover/>
      <BookBelongsTo/>
      <TableOfContents/>
      <GetToKnow/> 
      <Legend/>
      <Summary/>
      <Summary2/>
      <Summary3/>
      <Health/>
      <Nutrition/>
      <Fitness/>
      <Habbit/>
      <EndCover/>
    </div>
  );
}

export default Life;
