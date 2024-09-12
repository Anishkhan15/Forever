import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import Bestseller from '../Components/Bestseller'
import Ourpolicy from '../Components/Ourpolicy'
import Newletterbox from '../Components/Newletterbox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestseller/>
      <Ourpolicy/>
      <Newletterbox/>
    </div>
  )
}

export default Home