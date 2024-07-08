import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BannerSection from '../../components/BannerSection/BannerSection'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer'
import EventSection from '../../components/EventSection'
import CarouselPortal from '../../components/Carousel'
import Partnership from '../../components/Partnership'
import OurClients from '../../components/OurClients'

const Home = () => {
    
    return (
        <>
            <Navbar />
                <BannerSection />
                <EventSection />
                {/* <Cards /> */}
                {/* <CarouselPortal /> */}
                {/* <Partnership />
                <OurClients /> */}
            <Footer />
            
        </>
    )
}

export default Home
