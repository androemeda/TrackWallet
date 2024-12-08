import React from 'react';
import Header from './Header';
import Footer from './Footer';

function HomePage() {
  return <div className='relative h-screen'>
    <Header></Header>
    <div className='pt-[calc(60px)]'>
      HomePage
    </div>
    <Footer></Footer>
  </div>
}

export default HomePage;
