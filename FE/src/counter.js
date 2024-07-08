import AppAPI from './api/app/app.api'
// counter.js

if (sessionStorage.getItem('visit') === null) {
    updateCounter('visit-pageview')
} else {
    updateCounter('pageview')
}


function updateCounter(type) {
    if(type === 'visit-pageview' ) {
        const fetchVisits = async () => {
            try {
              const response = await AppAPI.updateVisits();
            } catch (error) {
              console.error("Error fetching visits:", error);
            }
        };
        fetchVisits();
    }
    AppAPI.updatePageviews()
}

sessionStorage.setItem('visit', 'x')
