import Exclusive from '@/components/Exclusive'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import VideoGallery from '@/components/Videos'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <Header /> 
      <div className='container mx-auto px-4 py-16 sm:py-24'>
      <Exclusive/>
      {/* <NewApartments/> */}
      <Gallery/>
      <VideoGallery/>
      </div>
      <Footer/>
    </div>
  )
}
