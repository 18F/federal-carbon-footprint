import React from 'react';

import { Banner } from './Banner';
import { Footer } from './Footer';

export const App = () => (
  <>
    <Banner />
    <div className="grid-container">
      <div className="usa-prose padding-top-3">
        <h1>Visualizing the Federal Carbon Footprint</h1>
        <p>
          Funded by <a href="https://10x.gsa.gov/">10x</a>, this repository is
          home to the{' '}
          <a href="https://trello.com/c/1N9dESH2/162-visualizing-the-federal-carbon-footprint">
            Visualizing the Federal Carbon Footprint
          </a>{' '}
          project.
        </p>
        <p>
          Currently in{' '}
          <a href="https://10x.gsa.gov/process/">phase two (discovery)</a>, we
          are focused on exploring this idea:
        </p>
        <p>
          <blockquote>
            We have observed that the federal government emits huge amounts of
            greenhouse gases (GHG) every year, including more than 37 million
            tons from federal facility operations in 2019 alone. The public
            lacks a window into how federal agencies are doing their part to
            reduce the effects of climate change. 10x will investigate how
            user-centered design and savvy data analysis could create a clear
            picture of the government’s efforts to kick its carbon habit,
            resulting in more transparency and accountability and ensuring that
            we, as civil servants, are doing our best to reduce the impact of
            climate change on our country.
          </blockquote>
        </p>
      </div>
    </div>
    <Footer />
  </>
);
